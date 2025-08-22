import { vi } from 'vitest'

vi.mock('@mobileaction/action-kit', () => {
  const Comp = (name: string) => ({
    name,
    props: ['modelValue','value','size','type','label','rows','placeholder','class'],
    emits: ['update:value','update:modelValue','click'],
    template: name === 'ma-input'
      ? '<textarea :value="modelValue ?? value" @input="$emit(\'update:value\', $event.target.value)"><slot/></textarea>'
      : '<button @click="$emit(\'click\')"><slot/></button>'
  })
  return {
    ma-form: { template: '<form><slot/></form>' },
    ma-input: Comp('ma-input'),
    ma-button: Comp('ma-button'),
    ma-avatar: { template: '<div class="ma-avatar"><slot/></div>' }
  }
})

vi.mock('@mobileaction/action-kit/dist/style.css', () => ({}), { virtual: true })
