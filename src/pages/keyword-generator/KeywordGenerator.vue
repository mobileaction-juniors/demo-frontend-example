<script setup>
  import { ref } from 'vue'
  import { filterArr, regex, splitRegex } from '@/cleanupResources';
  import {
    Input as AInput,
    Alert as AAlert,
    Select as ASelect,
    Tag as ATag,
    Button as AButton,
  } from 'ant-design-vue';

  const givenText = ref("");
  const nValue = ref(1);
  const optionsNumbers = ref(Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1} gram`,
    value: i + 1,
  })));

  const generatedValue = ref([]);
  const isAlertVisible = ref(false);
  const isGeneratedValueVisible = ref(false);

  // this function removes duplicate entries of an array and return a new one
  const removeDuplicate = (strArr) => {
    let newArr = [];
    strArr.forEach(word => {
      if ( !(newArr.includes(word)) )
        newArr.push(word);
    })
    return newArr;
  }

  // this function generates keywords according to the selected nValue
  const generateKeywords = (n, strArr) => {
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
    return removeDuplicate(newArr);
  }

  // clean from regex expressions and unwanted words and return words array
  const cleanArr = (text) => {
    let newText = text.replace(splitRegex, '');
    newText = newText.replace(regex, '');
    newText = newText.replace(/\s+/g, ' ');
    newText = newText.trim();
    let splitArr = newText.toLowerCase().split(" ");
    splitArr = splitArr.filter(token => !filterArr.includes(token.toLowerCase()));
    return splitArr;
  }

  // check if text is empty: if it is, give an alert
  // if not, generate keywords
  const printText = () => {
    // drop alert
    if ( givenText.value.trim() === "" ) {
      isAlertVisible.value = true;
      isGeneratedValueVisible.value = false;
    }
    else {
      let splitArr = cleanArr(givenText.value.trim());
      if ( nValue.value < splitArr.length )
        generatedValue.value = generateKeywords(nValue.value, splitArr);
      else
        generatedValue.value = [(splitArr.join(" "))];
      isAlertVisible.value = false;
      isGeneratedValueVisible.value = true;
    }
  }

  const selectChangeHandler = () => {
    if (generatedValue.value.length > 0)
      printText()
  }

  // close alert when clicked on the button
  const closeAlert = () => {
    isAlertVisible.value = false;
  }
</script>

<template>
  <div class="ma-keywords-generator">
    <div v-if="isAlertVisible" class="ma-custom-alert">
      <a-alert type="error" message="Please enter a text first" banner />
      <button @click="closeAlert">Close</button>
    </div>

    <div class="ma-select-holder">
      <a-select
          class="ma-select"
          ref="select"
          v-model="nValue"
          :options="optionsNumbers"
          @change="selectChangeHandler">
      </a-select>
    </div>

    <div class="ma-header">
      <a-input
          type="textarea"
          v-model="givenText"
          placeholder="Please enter text..."
          :autoSize="{ minRows: 6, maxRows: 8}"
      />
      <a-button class="ma-submit-button" @click="printText">
        <font-awesome-icon icon="fa-solid fa-check" />
      </a-button>
      <div class="ma-display-area" v-if="isGeneratedValueVisible">
        <a-tag v-for="(text, index) in generatedValue" :key="index">{{ text }}</a-tag>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ma-keyword-generator',
};
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
  margin-left: 12px;
}

.ma-select {
  padding: 6px;
  width: 120px;
  font-size: 14px;
}

.ma-header {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
  width: 100%;
}

.ma-submit-button {
  margin-top: 20px;
  background-color: aqua;
}

.ma-display-area {
  border: 2px solid #4682A9;
  border-radius: 6px;
  width: 100%;
  margin-top: 40px;
  padding: 10px;
}

.ma-custom-alert {
  width: 100%;
  background-color: rgb(255,241,240);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>