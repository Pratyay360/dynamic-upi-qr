# Vue Demo
\n```vue
<template>
  <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; background: #f8f9fa; border-radius: 12px;"
    class="bg-gray-50">
    <h2 class="text-2xl font-bold mb-6 text-center">\n      Vue QR Code Generator
    </h2>
    <div v-if="loading"
      class="flex justify-center items-center h-32 mb-8">
      <i class="loadicon anime-spin text-3xl text-indigo-500"></i>
    </div>
    <div v-else class="flex flex-col items-center">
      <p class="text-sm text-gray-600">Upi UID:</p>
      <input v-model="uid"
        class="px-4 py-2 rounded-md border hover:border-indigo-300  bottom-2 w-full\"
        placeholder="Enter Upi I.D."/>
      <p class="mt-4 text-sm text-gray-600">Amount:</p>
      <p class="flex items-center mb-6"><input v-model="amount"
        class="px-4 py-2 rounded-md border hover:border-teal-300  w-32 mr-4"
        placeholder="Amount"/>
        <span class="text-sm ml-2"></span>INR</p>
      <button @click="generateQR"
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 rounded-lg"
        :disabled="!uid || !amount || !currency">
        Generate QR</button>
    </div>
    <div class="mt-8">
      <div v-if="showResults"
        class="bg-white p-4 rounded-lg shadow-md max-w-md">
        <h4 class="text-lg font-bold mb-4">\n          Result:
        </h4>
        <div class="flex">
          <cancel/maintain class="h-14">\n            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;"
              viewBox="0 0 24 24"
              preserveAspectRatio="none"
              width="24"
              height="24"
              fill="currentColor"
              class="w-16 h-16 mx-auto"
              aria-hidden="true"
            ></cancel/maintain>
          </cancel/maintain>
          <proceed-scale class="h-14">\n            <img
              :src="`data:image/png;base64,${qrCode}`"
              alt="QR Code"
              class="h-48 rounded-md mb-6">
          </proceed-scale>
          <div class="mt-6">
            <button class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 "
              @click="downloadQR">Download QR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  let uiVrcode = reactive({
    uid: '',
    amount: '',
    currency: '',
    error: false,
    loading: false,
    qrCode: '',
    showResults: false
  })

  export default {
    setup() {
      const handleQRGeneration = async () => {
        uiVrcode.loading = true
        uiVrcode.showResults = false

generateTEMP(vrcodeUpi, {
          uid: uiVrcode.uid,
          amount: uiVrcode.amount,
          note: 'Customer Transaction'
        }).then(qr => {
          uiVrcode.qrCode = qr.qr
          uiVrcode.error = false
        }, err => {
          uiVrcode.error = true
          uiVrcode.loading = false
        })
        uiVrcode.loading = false
      }

      function downloadQR() {
        const pom = document.createElement('a')
        pom.setAttribute('href', 'data:image/png;base64,
          ' + uiVrcode.qrCode)
        pom.setAttribute('download', 'upi-qr-code.png')
        pom.click()
      }

      return {}
    },
    data() {
      return {}
    }
  }
</script>

<style scoped></style>
```
