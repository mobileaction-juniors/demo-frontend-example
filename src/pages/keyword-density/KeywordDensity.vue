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
  //yer boşsa mesaj çıkarıyo
  if (!text.value.trim()) {
    error.value = 'Please enter some text.'
    return
  }
  //sonra yer dolunca normale dönüyo
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
  <main class="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6">
    <section class="mx-auto max-w-5xl">
      <div class="mb-8">
        <span class="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          Keyword tools
        </span>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Keyword Density
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Analyze how often each word appears in your text and see its density percentage.
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div style="display: flex; gap: 24px; align-items: flex-start;">

          <!-- SOL: textarea + buton -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-800">Text to analyze</label>
              <MaInput
                v-model:value="text"
                type="textarea"
                placeholder="Enter text to count keyword density..."
                class="w-full"
                style="height: 300px"
              />
            </div>
            <div class="flex items-center gap-4">
              <MaButton color="blue" size="large" icon="ai-sparkle" @click="countKeywords">
                Count keywords
              </MaButton>
              <span v-if="totalChars" class="text-sm text-slate-500">
                Total characters: <strong class="text-slate-700">{{ totalChars }}</strong>
              </span>
            </div>
            <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
          </div>

          <!-- SAĞ: tablo -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
            <table v-if="results.length" class="w-full border-collapse text-sm">
              <thead>
                <tr class="bg-slate-800 text-white">
                  <th class="text-left px-4 py-2.5 font-semibold">Keyword</th>
                  <th class="px-4 py-2.5 font-semibold">Count</th>
                  <th class="px-4 py-2.5 font-semibold">Density</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in results"
                  :key="row.keyword"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
                  class="border-b border-slate-100 transition hover:bg-blue-50"
                >
                  <td class="px-4 py-2 font-medium text-slate-800">{{ row.keyword }}</td>
                  <td class="px-4 py-2 text-center text-slate-600">{{ row.count }}</td>
                  <td class="px-4 py-2 text-center">
                    <span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {{ row.density }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <MaButton v-if="results.length" @click="copyToClipboard">Copy to clipboard</MaButton>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>
