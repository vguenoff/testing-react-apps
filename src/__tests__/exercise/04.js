// form testing
// http://localhost:3000/login

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import { build, fake } from '@jackfranklin/test-data-bot'

const buildLoginForm = build({
    fields: {
        username: fake(faker => faker.internet.userName()),
        password: fake(faker => faker.internet.password()),
    },
})

// function buildLoginForm(overrides) {
//     return {
//         username: faker.internet.userName(),
//         password: faker.internet.password(),
//         ...overrides,
//     }
// }

test('submitting the form calls onSubmit with username and password', async () => {
    const handleSubmit = jest.fn()
    const { username, password } = buildLoginForm({ password: 'asd' })

    render(<Login onSubmit={handleSubmit} />)
    // screen.debug()

    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)
    const submit = screen.getByRole('button', { name: /submit/i })

    await userEvent.type(usernameField, username)
    await userEvent.type(passwordField, password)
    await userEvent.click(submit)

    expect(handleSubmit).toHaveBeenCalledWith({ username, password })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
