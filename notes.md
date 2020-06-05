

If I'm having a troublesome function, there is a way to see what's going on in the
terminal even though debugger doesn't work there. First you comment out everything,
the rest of the code in the method. So you know that nothing after the starting point
is causing the issue, or just to make sure your feedback from the console.log is accurate. Then, You can console.log what you want to check. But add a string first, like
console.log("Test 1", object).


// for debugging you can comment out everything else in the method, or just different
// parts, to see what happens and narrow down to the error. we commented out everthing
// after the console.log.
// you can make a whole separate note file also, a .md file.
// then rerun each part one at a time, like we just started with the function itself.
