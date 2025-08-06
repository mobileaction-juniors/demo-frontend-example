<template>
  <div>
      <the-header/>
      <div>
          <div>
              <router-view/>
          </div>
      </div>
  </div>
</template>


<style module>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
  font-family: 'Geist', sans-serif;
}

#app {
  font-family: 'Geist', sans-serif;
}
</style>
