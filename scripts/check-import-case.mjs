import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "src");
const sourceExtensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".json",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".avif",
];

const importRegex =
  /(?:import\s+(?:[^"']+?\s+from\s+)?["']([^"']+)["'])|(?:import\(\s*["']([^"']+)["']\s*\))/g;

function listSourceFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(fullPath));
      continue;
    }

    if ([".js", ".jsx", ".ts", ".tsx"].includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getImports(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const imports = [];
  let match;

  while ((match = importRegex.exec(code)) !== null) {
    const specifier = match[1] ?? match[2];
    if (specifier?.startsWith(".")) {
      imports.push(specifier);
    }
  }

  return imports;
}

function getCandidatePaths(importerPath, specifier) {
  const base = path.resolve(path.dirname(importerPath), specifier);
  const ext = path.extname(base);

  if (ext) {
    return [base];
  }

  const candidates = [];

  for (const extension of sourceExtensions) {
    candidates.push(`${base}${extension}`);
  }

  for (const extension of sourceExtensions) {
    candidates.push(path.join(base, `index${extension}`));
  }

  return candidates;
}

function checkExactCase(targetPath) {
  const normalized = path.normalize(targetPath);
  const parsed = path.parse(normalized);
  const segments = normalized
    .slice(parsed.root.length)
    .split(path.sep)
    .filter(Boolean);

  let currentDir = parsed.root;

  for (const segment of segments) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir);
    } catch {
      return { ok: false, reason: "missing" };
    }

    if (entries.includes(segment)) {
      currentDir = path.join(currentDir, segment);
      continue;
    }

    const caseInsensitiveMatch = entries.find(
      (entry) => entry.toLowerCase() === segment.toLowerCase(),
    );

    if (caseInsensitiveMatch) {
      return {
        ok: false,
        reason: "case-mismatch",
        expectedSegment: caseInsensitiveMatch,
        actualSegment: segment,
      };
    }

    return { ok: false, reason: "missing" };
  }

  return { ok: true };
}

function toDisplayPath(absolutePath) {
  return path.relative(projectRoot, absolutePath).split(path.sep).join("/");
}

function checkImports() {
  const files = listSourceFiles(sourceRoot);
  const errors = [];

  for (const file of files) {
    const imports = getImports(file);

    for (const specifier of imports) {
      const candidates = getCandidatePaths(file, specifier);
      const firstExisting = candidates.find((candidate) =>
        fs.existsSync(candidate),
      );

      if (!firstExisting) {
        errors.push({
          type: "missing",
          file,
          specifier,
        });
        continue;
      }

      const exactCase = checkExactCase(firstExisting);
      if (!exactCase.ok && exactCase.reason === "case-mismatch") {
        errors.push({
          type: "case-mismatch",
          file,
          specifier,
          expectedSegment: exactCase.expectedSegment,
          actualSegment: exactCase.actualSegment,
        });
      }
    }
  }

  return errors;
}

const errors = checkImports();

if (errors.length === 0) {
  console.log("Import path casing check passed.");
  process.exit(0);
}

console.error("Import path casing check failed:\n");

for (const error of errors) {
  if (error.type === "missing") {
    console.error(
      `- ${toDisplayPath(error.file)} imports '${error.specifier}', but no matching file was found.`,
    );
    continue;
  }

  console.error(
    `- ${toDisplayPath(error.file)} imports '${error.specifier}' with wrong casing (found '${error.expectedSegment}', used '${error.actualSegment}').`,
  );
}

process.exit(1);
