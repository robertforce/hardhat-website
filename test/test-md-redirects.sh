export URL="https://hardhat.org"
export ACCEPT_HEADER="Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5"

# By query parameter

## Landing page should redirect to /index.md with content-type text/markdown
curl --output /dev/null -v -L "$URL?format=md" 2>&1 | grep -q -i "Location: /index.md" || echo "⚠️ Test 1 failed"
curl --output /dev/null -v -L "$URL?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 2 failed"

## Documentation page should redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs/getting-started?format=md" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 3 failed"
curl --output /dev/null -v -L "$URL/docs/getting-started?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 4 failed"

## Plugin page should redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs/plugins/hardhat-toolbox-viem?format=md" 2>&1 | grep -q -i "Location: /docs/plugins/hardhat-toolbox-viem.md" || echo "⚠️ Test 5 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/hardhat-toolbox-viem?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 6 failed"

## Custom pages: plugin lists should redirect to the same pages with .md
curl --output /dev/null -v -L "$URL/docs/plugins/official-plugins?format=md" 2>&1 | grep -q -i "Location: /docs/plugins/official-plugins.md" || echo "⚠️ Test 7 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/community-plugins?format=md" 2>&1 | grep -q -i "Location: /docs/plugins/community-plugins.md" || echo "⚠️ Test 8 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/official-plugins?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 9 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/community-plugins?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 10 failed"

## Errors page should redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs/reference/errors?format=md" 2>&1 | grep -q -i "Location: /docs/reference/errors.md" || echo "⚠️ Test 11 failed"
curl --output /dev/null -v -L "$URL/docs/reference/errors?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 12 failed"

## 404 page should show a 404.md but with content type html
curl --output /dev/null -v -L "$URL/nope?format=md" 2>&1 | grep -q -i "Location: /nope.md" || echo "⚠️ Test 13 failed"
curl --output /dev/null -v -L "$URL/nope?format=md" 2>&1 | grep -q -i "HTTP/.* 404" || echo "⚠️ Test 14 failed"
curl --output /dev/null -v -L "$URL/nope?format=md" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 15 failed"

## llms.txt should not redirect to anything and have content type text/plain
curl --output /dev/null -v -L "$URL/llms.txt?format=md" 2>&1 | grep -q -i "Location:" && echo "⚠️ Test 16 failed"
curl --output /dev/null -v -L "$URL/llms.txt?format=md" 2>&1 | grep -q -i "Content-Type: text/plain" || echo "⚠️ Test 17 failed"

## Astro redirects

### Error codes should redirect to /docs/reference/errors.md with a hash
curl --output /dev/null -v -L "$URL/hhe1?format=md" 2>&1 | grep -q -i "Location: /docs/reference/errors.md?format=md#hhe1" || echo "⚠️ Test 18 failed"
curl --output /dev/null -v -L "$URL/hhe1?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 19 failed"

### Redirects to v2 should redirect to the v2 site
curl --output /dev/null -v -L "$URL/reference/solidity-support?format=md" 2>&1 | grep -q -i "Location: https://v2.hardhat.org/reference/solidity-support" || echo "⚠️ Test 20 failed"
curl --output /dev/null -v -L "$URL/reference/solidity-support?format=md" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 21 failed"

### Internal redirects should NOT redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs?format=md" 2>&1 | grep -q -i "Location: /docs/getting-started" || echo "⚠️ Test 22 failed"
curl --output /dev/null -v -L "$URL/docs?format=md" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 23 failed"
curl --output /dev/null -v -L "$URL/docs?format=md" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 24 failed"

### Privacy policy should redirect to /static/privacy-policy.html
curl --output /dev/null -v -L "$URL/privacy-policy.html?format=md" 2>&1 | grep -q -i "Location: /static/privacy-policy.html" || echo "⚠️ Test 25 failed"

### External redirects (/report-bug) should redirect to github
curl --output /dev/null -v -L "$URL/report-bug?format=md" 2>&1 | grep -q -i "Location: https://github.com" || echo "⚠️ Test 26 failed"

echo "Query parameter tests completed"

# By source query parameter

## Landing page should redirect to /index.md with content-type text/markdown
curl --output /dev/null -v -L "$URL?view=source" 2>&1 | grep -q -i "Location: /index.md" || echo "⚠️ Test 27 failed"
curl --output /dev/null -v -L "$URL?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 28 failed"

## Documentation page should redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs/getting-started?view=source" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 29 failed"
curl --output /dev/null -v -L "$URL/docs/getting-started?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 30 failed"

## Plugin page should redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs/plugins/hardhat-toolbox-viem?view=source" 2>&1 | grep -q -i "Location: /docs/plugins/hardhat-toolbox-viem.md" || echo "⚠️ Test 31 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/hardhat-toolbox-viem?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 32 failed"

## Custom pages: plugin lists should redirect to the same pages with .md
curl --output /dev/null -v -L "$URL/docs/plugins/official-plugins?view=source" 2>&1 | grep -q -i "Location: /docs/plugins/official-plugins.md" || echo "⚠️ Test 33 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/community-plugins?view=source" 2>&1 | grep -q -i "Location: /docs/plugins/community-plugins.md" || echo "⚠️ Test 34 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/official-plugins?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 35 failed"
curl --output /dev/null -v -L "$URL/docs/plugins/community-plugins?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 36 failed"

## Errors page should redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs/reference/errors?view=source" 2>&1 | grep -q -i "Location: /docs/reference/errors.md" || echo "⚠️ Test 37 failed"
curl --output /dev/null -v -L "$URL/docs/reference/errors?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 38 failed"

## 404 page should show a 404.md but with content type html
curl --output /dev/null -v -L "$URL/nope?view=source" 2>&1 | grep -q -i "Location: /nope.md" || echo "⚠️ Test 39 failed"
curl --output /dev/null -v -L "$URL/nope?view=source" 2>&1 | grep -q -i "HTTP/.* 404" || echo "⚠️ Test 40 failed"
curl --output /dev/null -v -L "$URL/nope?view=source" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 41 failed"

## llms.txt should not redirect to anything and have content type text/plain
curl --output /dev/null -v -L "$URL/llms.txt?view=source" 2>&1 | grep -q -i "Location:" && echo "⚠️ Test 42 failed"
curl --output /dev/null -v -L "$URL/llms.txt?view=source" 2>&1 | grep -q -i "Content-Type: text/plain" || echo "⚠️ Test 43 failed"

## Astro redirects

### Error codes should redirect to /docs/reference/errors.md with a hash
curl --output /dev/null -v -L "$URL/hhe1?view=source" 2>&1 | grep -q -i "Location: /docs/reference/errors.md?view=source#hhe1" || echo "⚠️ Test 44 failed"
curl --output /dev/null -v -L "$URL/hhe1?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 45 failed"

### Redirects to v2 should redirect to the v2 site
curl --output /dev/null -v -L "$URL/reference/solidity-support?view=source" 2>&1 | grep -q -i "Location: https://v2.hardhat.org/reference/solidity-support" || echo "⚠️ Test 46 failed"
curl --output /dev/null -v -L "$URL/reference/solidity-support?view=source" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 47 failed"

### Internal redirects should NOT redirect to the same page with .md
curl --output /dev/null -v -L "$URL/docs?view=source" 2>&1 | grep -q -i "Location: /docs/getting-started" || echo "⚠️ Test 48 failed"
curl --output /dev/null -v -L "$URL/docs?view=source" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 49 failed"
curl --output /dev/null -v -L "$URL/docs?view=source" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 50 failed"

### Privacy policy should redirect to /static/privacy-policy.html
curl --output /dev/null -v -L "$URL/privacy-policy.html?view=source" 2>&1 | grep -q -i "Location: /static/privacy-policy.html" || echo "⚠️ Test 51 failed"

### External redirects (/report-bug) should redirect to github
curl --output /dev/null -v -L "$URL/report-bug?view=source" 2>&1 | grep -q -i "Location: https://github.com" || echo "⚠️ Test 52 failed"

echo "Source query parameter tests completed"

# By Accept header

## Landing page should redirect to /index.md with content-type text/markdown
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL" 2>&1 | grep -q -i "Location: /index.md" || echo "⚠️ Test 53 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 54 failed"

## Documentation page should redirect to the same page with .md
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/getting-started" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 55 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/getting-started" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 56 failed"

## Plugin page should redirect to the same page with .md
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/plugins/hardhat-toolbox-viem" 2>&1 | grep -q -i "Location: /docs/plugins/hardhat-toolbox-viem.md" || echo "⚠️ Test 57 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/plugins/hardhat-toolbox-viem" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 58 failed"

## Custom pages: plugin lists should redirect to the same pages with .md
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/plugins/official-plugins" 2>&1 | grep -q -i "Location: /docs/plugins/official-plugins.md" || echo "⚠️ Test 59 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/plugins/community-plugins" 2>&1 | grep -q -i "Location: /docs/plugins/community-plugins.md" || echo "⚠️ Test 60 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/plugins/official-plugins" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 61 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/plugins/community-plugins" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 62 failed"

## Errors page should redirect to the same page with .md
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/reference/errors" 2>&1 | grep -q -i "Location: /docs/reference/errors.md" || echo "⚠️ Test 63 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs/reference/errors" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 64 failed"

## 404 page should show a 404.md but with content type html
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/nope" 2>&1 | grep -q -i "Location: /nope.md" || echo "⚠️ Test 65 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/nope" 2>&1 | grep -q -i "HTTP/.* 404" || echo "⚠️ Test 66 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/nope" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 67 failed"

## llms.txt should not redirect to anything and have content type text/plain
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/llms.txt" 2>&1 | grep -q -i "Location:" && echo "⚠️ Test 68 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/llms.txt" 2>&1 | grep -q -i "Content-Type: text/plain" || echo "⚠️ Test 69 failed"

## Astro redirects

### Error codes should redirect to /docs/reference/errors.md with a hash
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/hhe1" 2>&1 | grep -q -i "Location: /docs/reference/errors.md#hhe1" || echo "⚠️ Test 70 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/hhe1" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 71 failed"

### Redirects to v2 should redirect to the v2 site
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/reference/solidity-support" 2>&1 | grep -q -i "Location: https://v2.hardhat.org/reference/solidity-support" || echo "⚠️ Test 72 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/reference/solidity-support" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 73 failed"

### Internal redirects should NOT redirect to the same page with .md
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs" 2>&1 | grep -q -i "Location: /docs/getting-started" || echo "⚠️ Test 74 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 75 failed"
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/docs" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 76 failed"

### Privacy policy should redirect to /static/privacy-policy.html
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/privacy-policy.html" 2>&1 | grep -q -i "Location: /static/privacy-policy.html" || echo "⚠️ Test 77 failed"

### External redirects (/report-bug) should redirect to github
curl --output /dev/null -v -L -H "$ACCEPT_HEADER" "$URL/report-bug" 2>&1 | grep -q -i "Location: https://github.com" || echo "⚠️ Test 78 failed"

echo "Accept header tests completed"
