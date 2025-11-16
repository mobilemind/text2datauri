# Security Policy

## Supported Versions

The following versions of text2datauri are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.11.x  | :white_check_mark: |

## Reporting a Vulnerability

**For security vulnerabilities, please use private disclosure:**

1. **Preferred:** Report via [GitHub Security Advisories](https://github.com/mobilemind/text2datauri/security/advisories/new)
   - This allows for private, coordinated disclosure
   - You'll receive credit for the discovery
   - We can work together on a fix before public disclosure

2. **Alternative:** If you cannot use GitHub Security Advisories, create a private issue or email the maintainer directly (see package.json for contact info)

**Please do not report security vulnerabilities via public GitHub issues** as this may put users at risk before a fix is available.

### What to Include

When reporting a vulnerability, please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity, but typically within 30 days for high/critical issues

## Maintainer Security Practices

To ensure the integrity of published packages:

- **2FA Required:** All package maintainers must enable two-factor authentication on their npm accounts
- **Publishing:** Packages are published from GitHub Actions with npm provenance attestation for supply chain transparency
  - Automated publishing via GitHub Releases (on: release)
  - Uses granular access token (90-day expiry, rotated quarterly)
  - Provenance attestation provides cryptographic proof of build origin
  - Published packages can be verified at: `npm view text2datauri@<version> --json`
  - SBOM (Software Bill of Materials) attached to each release in CycloneDX format
- **Signed Commits:** All commits to the main branch must be GPG signed
- **Code Review:** All changes require review and approval before merging (via CODEOWNERS)
- **Zero Dependencies:** This package has zero production dependencies, eliminating dependency-based vulnerabilities
- **Dependency Monitoring:** Dependabot enabled to monitor for any future dependencies or peerDependency issues
- **Token Rotation:** npm publishing token rotated every 90 days
- **Lockfile Integrity:** npm ci validates package-lock.json integrity (fails if corrupted or mismatched)

### Branch Protection Rules

The `main` branch is protected with the following rules to prevent supply chain attacks:

#### Required Settings
- **Require pull request reviews before merging**
  - Required approving reviews: 1 (from CODEOWNERS)
  - Dismiss stale pull request approvals when new commits are pushed: ✓
  - Require review from Code Owners: ✓

- **Require status checks to pass before merging**
  - Require branches to be up to date before merging: ✓
  - Required status checks:
    - `Analyze (javascript)` - CodeQL security analysis
    - `build (22.x)` - Build and test on Node.js 22.x (minimum supported version)
    - `Lint Code Base` - Code quality and style checks

- **Require signed commits**
  - All commits must be signed with GPG key: ✓
  - This prevents commit impersonation and ensures authenticity

- **Require linear history**
  - Prevent merge commits: ✓
  - Enforce squash or rebase merging for clean history

- **Restrictions**
  - Restrict who can push to matching branches: ✓
  - Only repository administrators can push directly

- **Rules applied to administrators**
  - Include administrators: ✓
  - Even admins must follow branch protection rules

- **Allow force pushes**: ✗ (disabled)
- **Allow deletions**: ✗ (disabled)

#### Additional Protections
- **Lock branch**: Consider enabling for release branches
- **Do not allow bypassing the above settings**: ✓

### Repository Settings

Additional security settings enabled:
- **Vulnerability alerts**: ✓ Enabled (Dependabot alerts)
- **Security updates**: ✓ Automated security PRs via Dependabot
- **Secret scanning**: ✓ Enabled for detecting exposed credentials
- **Push protection**: ✓ Prevents accidental secret commits
- **Private vulnerability reporting**: ✓ Enabled via Security Advisories
