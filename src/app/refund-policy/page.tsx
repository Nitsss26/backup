import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
    title: `Refund Policy - ${APP_NAME}`,
    description: 'Learn about our refund policy and how refunds are processed.',
};

export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="prose prose-gray max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-lg text-blue-700">
                                <strong>Important:</strong> All approved refunds will be credited to your original payment method within 7-10 working days.
                            </p>
                        </div>
                    </div>
                </div>

                <section className="mb-8">
                    <p className="text-gray-600 mb-4">
                        Refunds will be issued only after proper conversation with both seller and users to ensure fair resolution for all parties involved.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
                    <p className="text-gray-600 mb-4">
                        For any refund requests or queries, please contact:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-600 mb-2">
                            <strong>Phone:</strong>{' '}
                            <a href="tel:7009090762" className="text-blue-600 hover:underline">
                                7009090762
                            </a>
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong>{' '}
                            <a href="mailto:edtechcart.verify@gmail.com" className="text-blue-600 hover:underline">
                                edtechcart.verify@gmail.com
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
