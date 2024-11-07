import { HiMiniMinusSmall, HiMiniPlusSmall } from 'react-icons/hi2';

const faqs = [
  {
    question: 'How do I sign-up?',
    answer: 'Check out Step-2 of the ordering instructions above.',
  },
  {
    question: 'What time do you stop taking orders?',
    answer:
      'If you are inside our free delivery area, we take orders until 6:45 pm. If you are outside of our free delivery range, orders must be placed no later than 5:00 pm, but this is subject to change based on road conditions. We reserve the right to cut off orders early based on sales volume.',
  },
  {
    question: 'Do you accept Venmo or CashApp?',
    answer: 'Sorry, unfortunately we are cash only.',
  },
];

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure
                key={faq.question}
                as="div"
                className="pt-6"
              >
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <HiMiniPlusSmall
                        aria-hidden="true"
                        className="h-6 w-6 group-data-[open]:hidden"
                      />
                      <HiMiniMinusSmall
                        aria-hidden="true"
                        className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600">
                    {faq.answer}
                  </p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
