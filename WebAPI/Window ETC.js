# History API
// let you navigate back and forth through the user's history, and manipulate the contents of the history stack.
//The current page's relative position is 0

window.history.back() === window.history.go(-1)

window.history.forward() === window.history.go(1)

window.history.go(0) ===  window.history.go() // refresh

numberOfEntries = window.history.length // history stack

const scrollRestoration = history.scrollRestoration
if (scrollRestoration === 'manual') {
  console.log('The location on the page is not restored, user will need to scroll manually.');
}else if(scrollRestoration === 'auto'){
    The location on the page to which the user has scrolled will be restored.
}

// 히스토리 스택 내용 바꾸기

// Should be null because we haven't modified the history stack yet
console.log(`History.state before pushState: ${history.state}`);
// Now push something on the stack
# History.pushState(state, unused, url)
//unsued is suppose tobe '' for historical reason.
history.pushState({name: 'Example'}, "", 'page3.html');
// Now state has a value.
console.log('History.state after pushState: ', history.state);

// 주소창에 엔트리만 바꾸고 페이지를 열진않는다.
history.replaceState({}, "", "bar2.html")


<script>
    // Open a tab with a specific browsing context name
    const otherTab = window.open("url1", "_blank");
    if (otherTab)
        otherTab.name = "other-tab";
</script>
<a href="url2" target="other-tab">This link will be opened in the other tab.</a>



#localStorage
localStorage.setItem('myCat', 'Tom');
cat = localStorage.getItem('myCat');
localStorage.removeItem('myCat');
localStorage.clear();

#location
location.assign("http://www.mozilla.org"); // or location = "http://www.mozilla.org";
location.reload(); // reload current page
location.replace(`http://example.com/#${location.pathname}`);


