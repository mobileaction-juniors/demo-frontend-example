<script setup>
import { ref } from 'vue'
import { MaInput, MaButton } from '@mobileaction/action-kit'

const props = defineProps({
  initialText: {
    type: String,
    default: ''
  }
})
//burayı parent dzüeneyecği için başta boş bıraktık, 
// parenttan gelecek metinle doldurulacak

const text = ref(props.initialText)
const results = ref([])
const error = ref('')
const totalChars = ref(0)

function countKeywords() {
  if (!text.value.trim()) {
    error.value = 'Please enter some text.'
    return
  }
  error.value = ''

  const words = text.value
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w !== '')

  totalChars.value = text.value.length
  //text 1 ref objesi ve vuede ref değerlerine .value ile erişilir
  //templatede {{ text }} yazarken otomatik olarak .value'ya erişilir,
  //  bu yüzden template içinde .value yazmaya gerek yokt

  //map oluşturup kelimeleri sayıyoruz mapi güncelleyip resultsa kaydedeiyoruz
  const map = new Map()
  for (const word of words) {
    if (map.has(word)) {
      map.set(word, map.get(word) + 1)
    } else {
      map.set(word, 1)
    }
  }

  results.value = Array.from(map.entries())
    .map(([keyword, count]) => ({ //her keyword count çiftini objeye dönüştürür
      keyword,
      count,
      density: ((count / words.length) * 100).toFixed(2)
    }))
    .sort((a, b) => b.count - a.count)  //en çok geçen kelime en üstte olcak şekilde sıralar
                                        // pozitif dönerse yer değiştiriyo a ve b negatif dönerse kalıyolar
}

function copyToClipboard() {
  const content = results.value   //results.value 1 array bunu ilk önce stringe çeviriyo
    .map(r => `${r.keyword}: ${r.count} (${r.density}%)`)
    .join('\n')
  navigator.clipboard.writeText(content)  //tarayıcının pano api si o stringi panoya kopyalıyor
}
</script>

<template>
  <main class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Keyword Density</h1>

    <div style="display: flex; gap: 24px; align-items: flex-start;">

      <!-- SOL: textarea + buton -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
        <MaInput
          v-model:value="text"
          type="textarea"
          placeholder="Enter text..."
          class="w-full"
          style="height: 300px"
        />
        <div class="flex items-center gap-4">
          <MaButton color="red" @click="countKeywords">Count</MaButton>
          <span class="text-sm text-gray-600">Total characters: <strong>{{ totalChars }}</strong></span>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </div>

      <!-- SAĞ: tablo -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
        <table v-if="results.length" class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="text-left px-4 py-2">Keyword</th>
              <th class="px-4 py-2">Count</th>
              <th class="px-4 py-2">Density</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in results"
              :key="row.keyword"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              class="border-b border-gray-100"
            >
              <td class="px-4 py-2">{{ row.keyword }}</td>
              <td class="px-4 py-2 text-center">{{ row.count }}</td>
              <td class="px-4 py-2 text-center">{{ row.density }}%</td>
            </tr>
          </tbody>
        </table>
        <MaButton v-if="results.length" @click="copyToClipboard">Copy to clipboard</MaButton>
      </div>

    </div>
  </main>
</template>
