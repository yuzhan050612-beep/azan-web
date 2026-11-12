import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'release');
const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
const archive = path.resolve('.portfolio-release.tar.gz');
function extract(parts) {
  fs.writeFileSync(archive, '');
  for (const part of parts) {
    const data = fs.readFileSync(path.join(source, part.file));
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    if (data.length !== part.bytes || hash !== part.sha256) {
      throw new Error(`Release file verification failed: ${part.file}`);
    }
    fs.appendFileSync(archive, data);
  }
  execFileSync('tar', ['-xzf', archive, '-C', process.cwd()], { stdio: 'inherit' });
}
try {
  extract(manifest.parts);
  for (const update of manifest.updates || []) {
    extract(update.parts);
    for (const name of update.removed || []) {
      const target = path.resolve(name);
      if (!target.startsWith(path.resolve('dist') + path.sep)) throw new Error('Invalid removed release path');
      fs.rmSync(target, { force: true });
    }
  }
  if (!fs.existsSync('dist/index.html')) throw new Error('Missing website entry point');
  console.log(`Prepared portfolio release from ${manifest.source_commit}`);
} finally {
  fs.rmSync(archive, { force: true });
}
