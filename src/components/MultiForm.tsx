import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import classNames from 'classnames'
import { InlineWidget } from 'react-calendly'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { useFormspark } from '@formspark/use-formspark'
import OutLinkIcon from './icons/OutlinkIcon'

const FORMSPARK_FORM_ID = process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID as string

interface Values {
  name: string
  email: string
  service: string
  details: string
}

const radioValues: string[] = [
  'Website',
  'UI/UX design',
  'SEO',
  'Landing page',
  'Development',
  'Other',
]

const ContactForm = () => {
  const [submit, submitting] = useFormspark({
    formId: `${FORMSPARK_FORM_ID}`,
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <p className="text-form-secondary">I&apos;m interested in...</p>
      <Formik
        initialValues={{ name: '', email: '', service: '', details: '' }}
        validate={values => {
          const errors: { name?: string; email?: string; details?: string } = {}
          if (!values.email) {
            errors.email = 'Please enter your email address'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Enter a valid email address'
          }
          return errors
        }}
        onSubmit={async (
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          try {
            await submit({ ...values })
            setMessage('Thanks for reaching out! I will get back to you soon.')
            setError(false)
            setSubmitting(false)
            resetForm()
          } catch (error) {
            setError(true)
            setMessage(
              'Something went wrong. Please contact me directly via email while I resolve the issue.'
            )
          }
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col space-y-8 pb-8">
            <div>
              <div className="block md:hidden">
                <Field
                  component="select"
                  id="service"
                  name="service"
                  multiple={false}
                  className="outline-accent border rounded border-form-secondary mt-2 p-1 min-w-[160px]"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {radioValues.map((value, index) => {
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  })}
                </Field>
              </div>
              <div className="hidden md:block">
                <div id="service"></div>
                <div
                  role="group"
                  aria-labelledby="service"
                  className="custom-radio flex gap-2 flex-wrap !my-4"
                >
                  {radioValues.map(value => {
                    return (
                      <label
                        key={value}
                        className={classNames({
                          '!bg-form-selection text-white dark:text-gray-900':
                            values.service === value,
                        })}
                      >
                        <Field type="radio" name="service" value={value} />
                        {value}
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
            <Field
              type="text"
              name="name"
              placeholder="Your name"
              className="bg-transparent border-b border-form-secondary p-1 px-1.5 focus:outline-accent focus:rounded"
            />
            <Field
              type="email"
              name="email"
              placeholder="Your email"
              className="bg-transparent border-b border-form-secondary p-1 px-1.5 focus:outline-accent focus:rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="!mt-1 !mb-0 font-semibold"
            />
            <Field
              as="textarea"
              type="text"
              name="details"
              placeholder="Tell me about your project"
              className="bg-transparent border border-form-secondary p-1 px-1.5 rounded min-h-[100px] focus:outline-accent focus:rounded"
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-fit min-w-[170px] text-center bg-transparent border-accent border-2 px-8 py-2.5 text-current dark:text-white font-bold rounded-lg hover:opacity-75 transition-opacity whitespace-nowrap text-sm sm:text-base focus:bg-gray-300 dark:focus:bg-gray-700 focus:!text-accent focus:outline-form-primary"
              >
                Submit
              </button>
              {message && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.4 },
                  }}
                >
                  <p
                    className={classNames(
                      'font-semibold',
                      error ? 'text-red-500' : 'text-green-500'
                    )}
                  >
                    {message}
                  </p>
                </motion.div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}

const CalendlyForm = () => {
  const { resolvedTheme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-full flex flex-col self-center"
    >
      <h3 className="text-form-secondary">Schedule an introductory call</h3>
      <InlineWidget
        url="https://calendly.com/stefankudla/30min"
        styles={{
          height: '500px',
        }}
        pageSettings={{
          backgroundColor: resolvedTheme === 'dark' ? '18181b' : 'fdfdff',
          hideEventTypeDetails: true,
          hideLandingPageDetails: true,
          primaryColor: '1A62FF',
          textColor: resolvedTheme !== 'dark' ? '111111' : 'ffffff',
        }}
      />
    </motion.div>
  )
}

const InfoForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-start gap-y-4"
    >
      <h3 className="text-form-secondary">Contact info</h3>
      <div className="mt-2 flex flex-col gap-y-4">
        <span className="text-form-secondary">
          Name: <span className="text-form-primary">Stefan Kudla</span>
        </span>
        <span className="text-form-secondary flex items-center gap-x-1">
          Email:{' '}
          <a
            href="mailto:stefan@stefankudla.com"
            className="flex items-center gap-x-1 text-form-primary hover:underline"
          >
            stefan@stefankudla.com
            <span className="block">
              <OutLinkIcon />
            </span>
          </a>
        </span>
        <span className="text-form-secondary">
          Availability: <span className="text-form-primary">Open to work</span>
        </span>
        <span className="text-form-secondary">
          Rates:{' '}
          <span className="text-form-primary">
            Project and hourly rates available upon request
          </span>
        </span>
        <span className="text-form-secondary">
          Location:{' '}
          <span className="text-form-primary">
            Greater Washington D.C. Area
          </span>
        </span>
        <span className="text-form-secondary">
          Timezone:{' '}
          <span className="text-form-primary">Eastern Daylight Time</span>
        </span>
      </div>
    </motion.div>
  )
}

const MultiForm = () => {
  const activeClass = 'text-form-primary underline font-bold'
  const [form, setForm] = useState('Form')
  return (
    <div className="p-4 lg:px-12 bg-card-background rounded-lg lg:pt-6 lg:pb-10 w-full shadow min-h-[519px] lg:min-h-[547px] max-w-xl mx-auto lg:mx-0">
      <div className="flex items-center gap-x-4 lg:justify-end mb-4 md:mb-2 lg:mb-0">
        <button
          className={classNames(
            form === 'Form' ? activeClass : 'text-form-secondary'
          )}
          onClick={() => setForm('Form')}
        >
          Form
        </button>
        <button
          className={classNames(
            form === 'Calendly' ? activeClass : 'text-form-secondary'
          )}
          onClick={() => setForm('Calendly')}
        >
          Calendly
        </button>
        <button
          className={classNames(
            form === 'Info' ? activeClass : 'text-form-secondary'
          )}
          onClick={() => setForm('Info')}
        >
          Info
        </button>
      </div>
      <AnimatePresence>
        {form === 'Form' ? (
          <ContactForm />
        ) : form === 'Calendly' ? (
          <CalendlyForm />
        ) : (
          <InfoForm />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MultiForm
