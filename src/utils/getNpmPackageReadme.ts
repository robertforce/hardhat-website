import { createGunzip } from "zlib";
import { Readable } from "stream";
import tar from "tar-stream";

/**
 * Fetches the README content of a package directly from the npm registry.
 * Works entirely in memory, no disk writes.
 *
 * @param pkgName The npm package name (supports scoped packages).
 * @param tag The version or dist-tag (e.g. "latest").
 * @returns The raw README.md content as a string.
 */
export async function getNpmPackageReadme(
  pkgName: string,
  tag = "latest",
): Promise<string> {
  const encodedName = encodeURIComponent(pkgName);
  const metaUrl = `https://registry.npmjs.org/${encodedName}`;

  const metaResponse = await fetch(metaUrl);
  if (!metaResponse.ok) {
    throw new Error(
      `Failed to fetch package metadata: ${metaResponse.status} ${metaResponse.statusText}`,
    );
  }

  const meta = await metaResponse.json();
  const version = meta["dist-tags"]?.[tag] ?? tag;
  const versionData = meta.versions?.[version];

  if (!versionData) {
    throw new Error(`Version '${tag}' not found for package '${pkgName}'`);
  }

  const tarballUrl: string = versionData.dist?.tarball;
  if (!tarballUrl) {
    throw new Error(`No tarball URL found for ${pkgName}@${version}`);
  }

  const tarballResponse = await fetch(tarballUrl);
  if (!tarballResponse.ok) {
    throw new Error(
      `Failed to download tarball: ${tarballResponse.status} ${tarballResponse.statusText}`,
    );
  }

  const tarballBuffer = Buffer.from(await tarballResponse.arrayBuffer());
  const readme = await extractReadmeFromTarball(tarballBuffer);

  if (!readme) {
    throw new Error(`README not found in ${pkgName}@${version}`);
  }

  return readme;
}

/** Extracts the first README* file found inside a tarball Buffer */
async function extractReadmeFromTarball(
  buffer: Buffer,
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const extract = tar.extract();
    let found = false;
    let result = "";

    extract.on("entry", (header, stream, next) => {
      const name = header.name.toLowerCase();
      if (/^package\/readme(\..+)?$/i.test(name)) {
        found = true;
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => {
          result = Buffer.concat(chunks).toString("utf8");
          resolve(result);
        });
      } else {
        stream.resume();
        stream.on("end", next);
      }
    });

    extract.on("finish", () => {
      if (!found) resolve(null);
    });

    extract.on("error", reject);

    const gunzip = createGunzip();
    Readable.from(buffer).pipe(gunzip).pipe(extract);
  });
}
