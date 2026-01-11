'use client';

import { Dialog, Transition } from '@headlessui/react';
import ContactForm from 'components/contact';
import { Fragment, useState } from 'react';

export default function ContactModalCta({
  triggerLabel,
  schoolName,
  schoolSlug
}: {
  triggerLabel: string;
  schoolName: string;
  schoolSlug: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B2C3F] shadow-lg shadow-black/20"
      >
        {triggerLabel}
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={close} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                  <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                    <Dialog.Title className="text-base font-semibold text-[#0B2C3F]">
                      Request a 15-minute overview
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-full px-3 py-1 text-sm font-semibold text-[#0B80A7] hover:bg-[#E7F7FF]"
                    >
                      Close
                    </button>
                  </div>

                  <div className="px-5 py-5">
                    <ContactForm
                      variant="modal"
                      prefillSchool={schoolName}
                      metadata={{
                        persona: 'admin_pta',
                        schoolSlug
                      }}
                      onSuccess={close}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

