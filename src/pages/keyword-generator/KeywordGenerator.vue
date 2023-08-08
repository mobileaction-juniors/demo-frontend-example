<script setup>
  import { ref } from 'vue'
  const text = ref("");
  const nValue = ref(1);
  let generatedValue = ref("");
  let isAlertVisible = ref(false);
  let isGeneratedValueVisible = ref(false);

  // this function removes duplicate entries of an array and return a new one
  function removeDuplicate(strArr) {
    let newArr = [];
    strArr.forEach(word => {
      if ( !(newArr.includes(word)) )
        newArr.push(word);
    })
    return newArr;
  }

  // this function generates keywords according to the selected nValue
  function generateKeywords(n, strArr) {
    let newArr = [];
    let index = 0;

    // iterate until there are still entries
    while ( index < strArr.length - (parseInt(n, 10)-1)) {
      newArr[index] = "";
      // get the current entry and up to n entries more to generate keywords
      for ( let i = index; i < index + parseInt(n, 10); i++) {
        newArr[index] = newArr[index] + " " + strArr[i];
      }
      index++;
    }
    let cleanArr = removeDuplicate(newArr); // remove duplicates
    return cleanArr.join(", "); // join keywords by ","
  }

  // check if text is empty: if it is, give an alert
  // if not, generate keywords
  function printText() {
    if ( text.value.trim() === "" ){
      isAlertVisible.value = true;
      isGeneratedValueVisible.value = false;
    }
    else {
      let splitArr = text.value.toLowerCase().split(" ");
      generatedValue.value = (generateKeywords(nValue.value, splitArr));
      isAlertVisible.value = false;
      isGeneratedValueVisible.value = true;
    }
  }

  function selectChangeHandler() {
    console.log("geldi mi buraya?")
    if (generatedValue.value !== "" )
      printText()
  }

  // close alert when clicked on the button
  function closeAlert() {
    isAlertVisible.value = false;
  }

</script>

<template>
  <div class="ma-keywords-generator">

    <div v-if="isAlertVisible" class="ma-custom-alert">
      Please enter a text first!
      <button @click="closeAlert">Close</button>
    </div>

    <div class="ma-select-holder">
      <select v-model="nValue" class="ma-select" @change="selectChangeHandler">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>

    <div class="ma-header">
      <textarea class="ma-textarea" v-model="text" placeholder="Please enter text..."></textarea>
      <button class="ma-submit-button" @click="printText">Submit</button>
      <div class="ma-display-div" v-if="isGeneratedValueVisible">
        {{generatedValue}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ma-keyword-generator',
}
</script>

<style scoped>

.ma-keywords-generator {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: auto;
  width: 40vw;
}

.ma-select-holder {
  margin-right: auto;
}
.ma-select {
  padding: 6px;
  width: 60px;
  font-size: 14px;
}
.ma-header {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
  width: 100%;
}

.ma-textarea {
  width: 100%;
  height: 200px;
  resize: none;
  padding: 10px;
  margin-bottom: 10px;
}

.ma-submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: auto;
}

.ma-display-div {
  border-color: #007bff;
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  width: 100%;
  margin-top: 40px;
  padding: 10px;
}

.ma-custom-alert {
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

</style>