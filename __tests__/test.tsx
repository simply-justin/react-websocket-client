import React from 'react'
import { render } from '@testing-library/react'

describe('Common render', () => {
    it('Render Element', () => {
        const element = render(<div></div>)
        expect(() => element.unmount()).not.toThrow()
    })
})
