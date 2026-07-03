"use client"

import { LoaderIcon, SparklesIcon } from 'lucide-react'
import { FormField } from '../forms/form-field'
import { Button } from '../ui/button'
import { addProductAction } from '@/lib/products/product-actions'
import { useActionState } from 'react'
import { cn } from '@/lib/utils'


const initialState: FormState = {
  success: false,
  errors: {},
  message: "",
};


type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
};

const ProductSubmitForm = () => {

  const [state, formAction, isPending] = useActionState(addProductAction, initialState);

  const { errors, success, message } = state;

  return (
    <form className='space-y-6' action={formAction}>
      {message && <div className={cn(
        'p-4 rounded-lg border',
        success ? "bg-primary/10 border-primary text-primary":"bg-destructive/10 border-destructive text-destructive"
        )}
        role='alert'
        aria-live="polite"
        >{message}</div>}
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder='My Awesome Product'
        required
        onChange={() => { }}
        error={errors?.name?.[0] ?? ""}
      />

      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder='my-awesome-product'
        required
        onChange={() => { }}
        error={errors?.slug?.[0] ?? ""}
        helperText='URL-friendly version of your product name'
      />

      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder='A brief, catchy description'
        required
        onChange={() => { }}
        error={errors?.tagline?.[0] ?? ""}
      />

      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder='Tell us more about your product...'
        required
        onChange={() => { }}
        error={errors?.description?.[0] ?? ""}
        textarea={true}
      />

      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder='https://www.yourproduct.com'
        required
        onChange={() => { }}
        error={errors?.websiteUrl?.[0] ?? ""}
        helperText="Enter your product's website or landing page"
      />

      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder='AI, SaaS, Productivity'
        required
        onChange={() => { }}
        error={errors?.tags?.[0] ?? ""} helperText='Comma-separated tags (e.g. AI, SaaS, Productivity)'
      />

      <Button type='submit' size="lg" className="w-full bg-primary">
        {isPending ? (
          <LoaderIcon className='size-4 animate-spin' />
        ) : (
          <>
            <SparklesIcon className='size-4' />
            Submit Product
          </>
        )}
      </Button>

    </form>
  )
}

export default ProductSubmitForm