<!--  **** CODE ISSUES **** -->

1. RESPONSIVE CARD - The book card is not responsive for smaller devices, did changes in book-search.scss file to achive responsiveness. (FIXED)
2. SEARCH BUTTON DISABLED - We can make search button disabled by default and dynamically make it enable once the input is entered by user and remove else condittion in searchBooks() function in book-search component. (Fixed)
3. META TAGS - We can add a meta description for better SEO of webpage. Updated meta tag in constructor of app.component.ts file. (Fixed)
4. HREF TAG FIX - In book-search.component.html <a> tag is used which is not required as it is not a link. Instead we can use <span> tag and taking styles from <a> tag present in base.scss file. (Fixed)
5. MATERIAL MODULE - We can add a seprate module for angular material imports, the repo can be more structured.

<!--  **** LIGHTHOUSE SCAN ACCESSIBILITY ISSUES **** -->

1. ISSUE - Buttons do not have an accessible name (Search Button)
   FIX - Added aria-label="search" to button in book-search.component.html.
2. ISSUE - Background and foreground colors do not have a sufficient contrast ratio.
   FIX - Changed .empty class color from $grey40 to $gray60 in book-search.component.scss file.

<!-- **** MANUAL ACCESSIBILITY ISSUES (Issues not found by automated scan) **** -->

1. ISSUE - "<img>" tags do not have "alt" attributes
   FIX - Added dynamic [alt]="b.title + ' cover image'" in book-search.component.html & reading-list.component.html.
2. ISSUE - Missing aria-label atrributes on buttons
   FIX - Added aria-label="Want to Read" to button in book-search.component.html, Added aria-label="Open Reading List" & aria-label="close" in app.component.html files.
3. ISSUE - Search input attributes missing
   FIX - Added missing attributes to search input(mentioned below) in book-search.component.html file.

   name="search"
   title="Search for books to add to your reading list"
   aria-label="Search for books to add to your reading list"

<!-- **** TEST RESULTS **** -->

1. npm run lint - PASSED
2. npm run test -

   RESULTS
   Test Suites: 1 failed, 6 passed, 7 total
   Tests: 2 failed, 12 passed, 14 total

   FIX - Change in "failedAddToReadingList" & "failedRemoveFromReadingList expected result in reading-list.reducer.spec.ts file.

   RESULTS AFTER FIX
   Test Suites: 7 passed, 7 total
   Tests: 14 passed, 14 total

3. npm run e2e - PASSED