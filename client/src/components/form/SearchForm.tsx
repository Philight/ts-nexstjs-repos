'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { Search, X } from 'lucide-react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@components/action/Button';
import FormProvider from '@components/form/FormProvider';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/form/RHFForm';
import { Input } from '@components/form/base/Input';
import { Badge } from '@components/util/Badge';

import { useDebounce } from '@hooks/useDebounce';

// ============================================================================

const DEBOUNCE_DELAY = 1500;

const FormSchema = z.object({
  search: z.string().min(2, {
    message: 'Enter atleast two characters for repository name',
  }),
});

// ============================================================================

export function SearchForm({ className, onClear, onSearch }) {
  const inputId = useId();

  const defaultValues: any = {
    search: '',
  };
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    clearErrors,
    setError,
    getValues,
    setValue,
    watch,
    reset,
    control,
  } = methods;

  watch('search');
  const searchValue = getValues('search');
  const { debounce } = useDebounce(searchValue, DEBOUNCE_DELAY);

  const onSubmit = handleSubmit(async (data: z.infer<typeof FormSchema>, event?: React.BaseSyntheticEvent) => {
    try {
      event?.preventDefault();
      if (!debounce) return;

      // VALIDATE BEFORE SUBMIT

      toast('You searched for:', {
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

      onSearch(data.search);

      // // TRANSFORM FIELDS

      // const { userType, nickname, description, email, password, gallery, category, subcategory } = data;

      // const params = {
      //   user_type: userType,
      //   nickname,
      //   description,
      //   email,
      //   password,
      //   locale: evaluateLocale(localeFromBrowser),
      //   category_id: Number(categories?.find((c: any) => c.title === category)?.id),
      //   subcategory_id: Number(subcategories?.find((c: any) => c.title === subcategory)?.id),
      //   gallery: await gallery.map((elem: any) => (elem.id ? { id: elem.id } : { file: elem.file })),
      //   links: await Object.keys(data)
      //     .filter((e: any) => e.includes('link-title'))
      //     .map((fieldName: any) => ({
      //       title: data[fieldName],
      //       url: withProtocol(data[fieldName.replace('title', 'url')], 'https'),
      //     }))
      //     .filter((link: any) => link.title && link.url), // Filter out empty ones
      // };

      // // SEND REQUEST

      // await register(params);
      // // if (response instanceof Error) {
      // //   parseErrors(response);
      // //   return;
      // // }

      // // RESPONSE OK

      // // const returnTo = `${paths.account.posts}?reload=true`;
      // const returnTo = `${paths.account.feed}?reload=true`;
      // replaceSearchParams({
      //   ...searchParamsObject,
      //   returnTo,
      // });

      // // BACKUP ROUTER PUSH

      // setTimeout(() => {
      //   push(returnTo);
      // }, 4000);

      // openToast({
      //   style: 'success',
      //   autoHide: 4000,
      //   withClose: true,
      //   text: SUCCESS_MESSAGES.register,
      //   action: () => push(returnTo),
      // });

      // RESPONSE ERROR
    } catch (error) {
      // transformErrors(error, setError);
      // openToast({
      //   style: 'error',
      //   autoHide: 5000,
      //   withClose: true,
      //   text: Array.isArray(error.clientMessage) ? error.clientMessage.join('\n') : error.clientMessage,
      // });
    }
  });

  // ============================================================================

  return (
    <div className={cn(className, 'search-form__c w-full')}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Badge label='Repositories' variant='outline' color='primary' />
        <div className={cn('search-bar__c f-center-y ')}>
          <FormField
            control={control}
            name='search'
            render={({ field, fieldState: { error } }) => (
              <FormItem className='flex-1'>
                <div className={cn('f-center-y search-bar__input-wrapper')}>
                  <FormLabel htmlFor={inputId}>
                    <Search className='mr-2 h-4 w-4 shrink-0 opacity-50 text-accent' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={inputId}
                      placeholder='repository name..'
                      autoComplete='off'
                      {...field}
                      value={searchValue}
                      onChange={({ target }) => setValue('search', target.value)}
                    />
                  </FormControl>
                  <X className={cn('mr-4 md:mr-5 block h-5 w-5 shrink-0 opacity-50', !searchValue.length && 'hidden')} onClick={() => reset()} />
                </div>
                {/*<FormDescription>This is your public display name.</FormDescription>*/}
                <FormMessage className={cn('absolute mt-1')} />
              </FormItem>
            )}
          />

          <Button type='submit' color='primary'>
            Submit
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}
