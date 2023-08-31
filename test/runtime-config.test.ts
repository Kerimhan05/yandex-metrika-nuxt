import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'

describe('runtime config tests', async () => {
  import.meta.env.NUXT_PUBLIC_YANDEX_METRIKA_ID = '49439650' // This part is tested
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    browser: true,
    nuxtConfig: {
      runtimeConfig: {
        public: {
          yandexMetrika: {
            id: '',
          },
        },
      },
      yandexMetrika: {
        noscript: true,
        initParams: {
          defer: false,
          clickmap: false,
          trackLinks: true,
          accurateTrackBounce: false,
          webvisor: false,
          ecommerce: false,
        },
      },
    },
  })

  it('should get id from env in runtime', async () => {
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const page = await $fetch('/')
    expect(page).toContain('ym("49439650", "init", {"defer":false,"clickmap":false,"trackLinks":true,"accurateTrackBounce":false,"webvisor":false,"ecommerce":false});')
  })
})
