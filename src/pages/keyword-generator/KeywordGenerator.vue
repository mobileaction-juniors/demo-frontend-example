<template>
  <div class="ma-keywords-generator">
    <div class="ma-select-holder">
      <a-select
          ref="select"
          v-model:value="nValue"
          :options="optionsNumbers"
          @change="selectChangeHandler"
          class="ma-select"/>
    </div>

    <div class="ma-header">
      <a-textarea
          v-model:value="givenText"
          placeholder="Please enter text..."
          :rows="6"
      />
      <a-button class="ma-submit-button" @click="printText">
        <font-awesome-icon icon="angle-right" />
      </a-button>

      <a-alert
          v-if="isAlertVisible"
          message="Please enter a text first"
          type="error"
          closable
          :after-close="closeAlert"
          class="ma-custom-alert"
      />

      <div class="ma-display-area" v-if="isGeneratedValueVisible">
        <a-tag v-for="(text, index) in generatedValue" :key="index">{{ text }}</a-tag>
      </div>
    </div>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { filterArr, regex, splitRegex } from '@/cleanupResources';
  import {
    Textarea as ATextarea,
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
  const removeDuplicate = (keywordsArr) => {
    let newArr = [];
    keywordsArr.forEach(word => {
      if ( !(newArr.includes(word)) )
        newArr.push(word);
    })
    return newArr;
  }

  // this function generates keywords according to the selected nValue
  const generateKeywords = (n, strArr) => {
    let newArr = [];
    let indexOfNewArr = 0;

    // iterate until there are still entries
    while ( indexOfNewArr < strArr.length - (parseInt(n, 10)-1)) {
      newArr[indexOfNewArr] = "";
      // get the current entry and up to n entries more to generate keywords
      for ( let i = indexOfNewArr; i < indexOfNewArr + parseInt(n, 10); i++) {
        newArr[indexOfNewArr] = newArr[indexOfNewArr] + " " + strArr[i];
      }
      indexOfNewArr++;
    }
    return removeDuplicate(newArr);
  }

  // clean from regex expressions and unwanted words and return words array
  const cleanArr = (inputText) => {
    let newText = inputText.replace(splitRegex, '');
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

<style scoped>
.ma-keywords-generator {
  @apply flex flex-col items-start mx-auto w-2/3 md:w-4/12;
}

.ma-select-holder {
  @apply p-0 mr-auto ml-0;
}

.ma-select {
  @apply w-28 text-sm mb-4;
}

.ma-header {
  @apply flex flex-col items-end p-0 w-full;
}

.ma-submit-button {
  @apply mt-6;
}

.ma-display-area {
  @apply p-2 mt-8 w-full border-2 rounded-md;
}

.ma-custom-alert {
  @apply w-full mb-4 mt-8;
}
</style>