# GitHub Actions Setup Guide

This guide explains how to set up and configure the GitHub Actions CI/CD pipeline for your Cypress API tests.

## Prerequisites

1. **GitHub Repository**: Your code must be pushed to a GitHub repository
2. **Repository Access**: You need admin access to configure secrets and workflows

## Step 1: Configure Repository Secrets

Navigate to your repository → Settings → Secrets and variables → Actions, then add:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `CYPRESS_ADMIN_EMAIL` | `admin@practicesoftwaretesting.com` | Admin email for API authentication |
| `CYPRESS_ADMIN_PASSWORD` | `welcome01` | Admin password for API authentication |

## Step 2: Update Badge URLs

In your README.md, replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

Example:
```markdown
[![Cypress API Tests](https://github.com/johndoe/api-cypress-tests/workflows/Cypress%20API%20Tests/badge.svg)](https://github.com/johndoe/api-cypress-tests/actions)
```

## Step 3: Workflow Files

### Main Test Workflow (cypress-tests.yml)

**Triggers:**
- Push to main/master/develop branches
- Pull requests to main/master/develop branches
- Manual trigger via workflow_dispatch

**Features:**
- **Matrix Strategy**: Tests on Node.js 18 & 20 with Chrome
- **Artifacts**: Screenshots and videos uploaded on failures
- **Environment Variables**: Secure credential injection

## Step 4: Advanced Configuration

### Custom Test Environments

You can modify the matrix in `cypress-tests.yml`:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 21]
    browser: [chrome, firefox, edge]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### Cypress Cloud Integration (Optional)

To integrate with Cypress Cloud:

1. Sign up at [Cypress Cloud](https://cloud.cypress.io)
2. Get your project ID and record key
3. Add secrets:
   - `CYPRESS_PROJECT_ID`
   - `CYPRESS_RECORD_KEY`
4. Update workflow to include recording:

```yaml
- name: Run Cypress tests
  uses: cypress-io/github-action@v6
  with:
    record: true
    parallel: true
  env:
    CYPRESS_PROJECT_ID: ${{ secrets.CYPRESS_PROJECT_ID }}
    CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

### Slack Notifications (Optional)

Add Slack notifications for test results:

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    channel: '#qa-alerts'
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Step 5: Monitoring and Maintenance

### Viewing Results

1. Go to your repository → Actions tab
2. Click on any workflow run to see details
3. Download artifacts (screenshots/videos) from failed runs

### Branch Protection Rules

Set up branch protection to require passing tests:

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select "cypress-run" and "smoke-test" checks

### Performance Optimization

- **Caching**: The workflows use npm caching for faster builds
- **Parallelization**: Matrix strategy runs tests in parallel
- **Selective Testing**: Use `spec` parameter to run specific test files

## Troubleshooting

### Common Issues

1. **Tests fail in CI but pass locally**:
   - Check environment variables are set correctly
   - Verify API endpoints are accessible from GitHub runners
   - Review browser compatibility issues

2. **Artifacts not uploading**:
   - Check artifact paths in workflow files
   - Verify retention settings
   - Ensure proper permissions

3. **Secrets not working**:
   - Verify secret names match exactly
   - Check secret values are correct
   - Ensure secrets are available to the workflow

### Debug Mode

Enable debug logging by adding:

```yaml
env:
  DEBUG: cypress:*
  ACTIONS_STEP_DEBUG: true
```

## Security Best Practices

1. **Never commit secrets** to the repository
2. **Use environment variables** for all sensitive data
3. **Regularly rotate** API credentials
4. **Limit secret access** to necessary workflows only
5. **Use dependabot** to keep actions updated

## Cost Optimization

- Use `ubuntu-latest` runners (cheapest option)
- Limit matrix combinations for faster feedback
- Use `npm ci` instead of `npm install` for faster builds
- Enable caching for dependencies
- Consider self-hosted runners for large test suites

---

For more information, see the [GitHub Actions documentation](https://docs.github.com/en/actions) and [Cypress GitHub Action documentation](https://github.com/cypress-io/github-action).
