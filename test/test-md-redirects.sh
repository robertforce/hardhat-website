export URL="https://hardhat.org"

# By user agent

## Landing page should redirect to /index.md with content-type text/markdown
curl --output /dev/null -v -L -A "claude" "$URL" 2>&1 --output /dev/null | grep -q -i "Location: /index.md" || echo "⚠️ Test 1 failed" 
curl --output /dev/null -v -L -A "claude" "$URL" 2>&1 --output /dev/null | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 2 failed" 

## Documentation page so redirect to the same page with .md
curl --output /dev/null -v -L -A "claude" "$URL/docs/getting-started" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 3 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs/getting-started" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 4 failed" 

## Plugin page should redirect to the same page with .md
curl --output /dev/null -v -L -A "claude" "$URL/docs/plugins/hardhat-toolbox-viem" 2>&1 | grep -q -i "Location: /docs/plugins/hardhat-toolbox-viem.md" || echo "⚠️ Test 5 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs/plugins/hardhat-toolbox-viem" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 6 failed" 

## Custom pages: plugin lists — Should redirect to the same pages with .md
curl --output /dev/null -v -L -A "claude" "$URL/docs/plugins/official-plugins" 2>&1 | grep -q -i "Location: /docs/plugins/official-plugins.md" || echo "⚠️ Test 7 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs/plugins/community-plugins" 2>&1 | grep -q -i "Location: /docs/plugins/community-plugins.md" || echo "⚠️ Test 8 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs/plugins/official-plugins" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 9 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs/plugins/community-plugins" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 10 failed" 

## Errors page should redirect to the same page with .md
curl --output /dev/null -v -L -A "claude" "$URL/docs/reference/errors" 2>&1 | grep -q -i "Location: /docs/reference/errors.md" || echo "⚠️ Test 11 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs/reference/errors" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 12 failed" 

## 404 page should show a 404.md but with content type html
curl --output /dev/null -v -L -A "claude" "$URL/nope" 2>&1 | grep -q -i "Location: /nope.md" || echo "⚠️ Test 13 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/nope" 2>&1 | grep -q -i "HTTP/.* 404" || echo "⚠️ Test 14 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/nope" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 15 failed" 

## llms.txt should not redirect to anything and have content type text/plain
curl --output /dev/null -v -L -A "claude" "$URL/llms.txt" 2>&1 | grep -q -i "Location:" && echo "⚠️ Test 16 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/llms.txt" 2>&1 | grep -q -i "Content-Type: text/plain" || echo "⚠️ Test 17 failed" 

## Astro redirects

### Error codes should redirect to /docs/reference/errors.md with a hash
curl --output /dev/null -v -L -A "claude" "$URL/hhe1" 2>&1 | grep -q -i "Location: /docs/reference/errors.md#hhe1" || echo "⚠️ Test 18 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/hhe1" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 19 failed" 

### Redirects to v2 should redirect to the v2 site
curl --output /dev/null -v -L -A "claude" "$URL/reference/solidity-support" 2>&1 | grep -q -i "Location: https://v2.hardhat.org/reference/solidity-support" || echo "⚠️ Test 20 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/reference/solidity-support" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 21 failed" 

### Internal redirects should NOT redirect to the same page with .md
curl --output /dev/null -v -L -A "claude" "$URL/docs" 2>&1 | grep -q -i "Location: /docs/getting-started" || echo "⚠️ Test 22 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 23 failed" 
curl --output /dev/null -v -L -A "claude" "$URL/docs" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 24 failed" 

### Privacy policy should redirect to /static/privacy-policy.html
curl --output /dev/null -v -L -A "claude" "$URL/privacy-policy.html" 2>&1 | grep -q -i "Location: /static/privacy-policy.html" || echo "⚠️ Test 25 failed" 

### External redirects (/report-bug) should redirect to github
curl --output /dev/null -v -L -A "claude" "$URL/report-bug" 2>&1 | grep -q -i "Location: https://github.com" || echo "⚠️ Test 26 failed" 

echo "User agent tests completed"

# With accept header including text/markdown

## Landing page should redirect to /index.md with content-type text/markdown
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL" 2>&1 --output /dev/null | grep -q -i "Location: /index.md" || echo "⚠️ Test 27 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL" 2>&1 --output /dev/null | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 28 failed" 

## Documentation page so redirect to the same page with .md
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/getting-started" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 29 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/getting-started" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 30 failed" 

## Plugin page should redirect to the same page with .md
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/plugins/hardhat-toolbox-viem" 2>&1 | grep -q -i "Location: /docs/plugins/hardhat-toolbox-viem.md" || echo "⚠️ Test 31 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/plugins/hardhat-toolbox-viem" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 32 failed" 

## Custom pages: plugin lists — Should redirect to the same pages with .md
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/plugins/official-plugins" 2>&1 | grep -q -i "Location: /docs/plugins/official-plugins.md" || echo "⚠️ Test 33 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/plugins/community-plugins" 2>&1 | grep -q -i "Location: /docs/plugins/community-plugins.md" || echo "⚠️ Test 34 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/plugins/official-plugins" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 35 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/plugins/community-plugins" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 36 failed" 

## Errors page should redirect to the same page with .md
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/reference/errors" 2>&1 | grep -q -i "Location: /docs/reference/errors.md" || echo "⚠️ Test 37 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs/reference/errors" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 38 failed" 

## 404 page should show a 404.md but with content type html
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/nope" 2>&1 | grep -q -i "Location: /nope.md" || echo "⚠️ Test 39 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/nope" 2>&1 | grep -q -i "HTTP/.* 404" || echo "⚠️ Test 40 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/nope" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 41 failed" 

## llms.txt should not redirect to anything and have content type text/plain
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/llms.txt" 2>&1 | grep -q -i "Location:" && echo "⚠️ Test 42 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/llms.txt" 2>&1 | grep -q -i "Content-Type: text/plain" || echo "⚠️ Test 43 failed" 

## Astro redirects

### Error codes should redirect to /docs/reference/errors.md with a hash
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/hhe1" 2>&1 | grep -q -i "Location: /docs/reference/errors.md#hhe1" || echo "⚠️ Test 44 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/hhe1" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 45 failed" 

### Redirects to v2 should redirect to the v2 site
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/reference/solidity-support" 2>&1 | grep -q -i "Location: https://v2.hardhat.org/reference/solidity-support" || echo "⚠️ Test 46 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/reference/solidity-support" 2>&1 | grep -q -i "Content-Type: text/html" || echo "⚠️ Test 47 failed" 

### Internal redirects should NOT redirect to the same page with .md
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs" 2>&1 | grep -q -i "Location: /docs/getting-started" || echo "⚠️ Test 48 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs" 2>&1 | grep -q -i "Location: /docs/getting-started.md" || echo "⚠️ Test 49 failed" 
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/docs" 2>&1 | grep -q -i "Content-Type: text/markdown" || echo "⚠️ Test 50 failed" 

### Privacy policy should redirect to /static/privacy-policy.html
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/privacy-policy.html" 2>&1 | grep -q -i "Location: /static/privacy-policy.html" || echo "⚠️ Test 51 failed" 

### External redirects (/report-bug) should redirect to github
curl --output /dev/null -v -L -H "Accept: text/markdown;q=1.0, application/json;q=0.9, text/plain;q=0.8, text/html;q=0.7, application/xml;q=0.6, */*;q=0.5" "$URL/report-bug" 2>&1 | grep -q -i "Location: https://github.com" || echo "⚠️ Test 52 failed" 

echo "Accept header tests completed"
