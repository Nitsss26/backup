
"use client";

import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CATEGORIES, DIFFICULTY_LEVELS, LANGUAGES } from '@/lib/constants';
import { PlusCircle, Trash2, Loader2, Info, Video, BookCopy, CalendarClock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { getCourseById } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import { cn } from '@/lib/utils';

const lessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  type: z.enum(['video', 'pdf', 'quiz', 'text', 'assignment']),
  duration: z.string().optional().refine(val => !val || /^\d+m(in)?s?$/.test(val) || /^\d+h(r)?s?$/.test(val) || /^\d+h\s\d+m(in)?s?$/.test(val), { message: "Duration invalid (e.g., 10min, 2hr, 1h 30min)"}),
  contentUrl: z.string().url("Must be a valid URL for content like video or PDF.").optional().or(z.literal('')),
  textContent: z.string().optional(),
  order: z.number().int().min(1),
  isFreePreview: z.boolean().default(false),
});

const moduleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Module title must be at least 3 characters"),
  lessons: z.array(lessonSchema).min(1, "Module must have at least one lesson"),
  order: z.number().int().min(1),
});

const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  shortDescription: z.string().min(20, "Short description is too short").max(150, "Short description is too long"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(DIFFICULTY_LEVELS as [string, ...string[]], { errorMap: () => ({ message: "Please select a difficulty level."}) }),
  language: z.string().min(1, "Language is required"),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  originalPrice: z.coerce.number().optional(),
  imageUrl: z.string().url("Must be a valid URL for image").optional().or(z.literal('')),
  certificateAvailable: z.boolean().default(false),
  highlights: z.array(z.string().min(3, "Highlight too short")).optional(),
  curriculum: z.array(moduleSchema).min(1, "Course must have at least one module"),
  moneyBackGuaranteeDays: z.coerce.number().int().min(0).max(90).optional(),
  freeTrialAvailable: z.boolean().default(false),
  demoVideoUrl: z.string().url("Must be a valid URL for demo video").optional().or(z.literal('')),
  downloadableMaterialsDescription: z.string().max(500, "Description of downloadable materials is too long (max 500 chars)").optional(),
  detailedScheduleDescription: z.string().max(1000, "Detailed schedule description is too long (max 1000 chars)").optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function EditCoursePage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [initialCourseData, setInitialCourseData] = useState<Course | null>(null);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
  });
  
  useEffect(() => {
    if (courseId) {
      const courseData = getCourseById(courseId);
      if (courseData) {
        setInitialCourseData(courseData);
        reset({
          ...courseData,
          highlights: courseData.highlights || ["", "", ""],
          curriculum: courseData.curriculum?.map(m => ({
            ...m,
            lessons: m.lessons.map(l => ({...l, duration: l.duration || ""})) || [] 
          })) || [{ title: "", order: 1, lessons: [{ title: "", type: "video", order: 1, isFreePreview: false, duration: "" }] }],
          moneyBackGuaranteeDays: courseData.moneyBackGuaranteeDays || 0,
          freeTrialAvailable: courseData.freeTrialAvailable || false,
          demoVideoUrl: courseData.demoVideoUrl || "",
          downloadableMaterialsDescription: courseData.downloadableMaterialsDescription || "",
          detailedScheduleDescription: courseData.detailedScheduleDescription || "",
        });
      } else {
        toast({ title: "Error", description: "Course not found.", variant: "destructive" });
        router.push('/dashboard/seller/courses');
      }
    }
  }, [courseId, reset, toast, router]);


  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({ control, name: "highlights" });
  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({ control, name: "curriculum" });
  
  const watchCurriculum = watch("curriculum");

  const onSubmit = async (data: CourseFormValues) => {
    setIsLoading(true);
    console.log("Updated course data submitted:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Course Updated Successfully!",
      description: `"${data.title}" has been updated. Changes might require admin re-approval if significant.`,
      duration: 5000,
    });
    setIsLoading(false);
    router.push('/dashboard/seller/courses');
  };

  if (!initialCourseData && courseId) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)] w-full"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>;
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Edit Course: <span className="text-primary">{initialCourseData?.title}</span></h1>
        <Button type="submit" disabled={isLoading} size="lg" className="text-base px-8 py-3">
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Save Changes
        </Button>
      </div>

       <Card className="border shadow-md bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Basic Information</CardTitle>
          <CardDescription>Update the fundamental details for your course.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Course Title *</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="shortDescription">Short Description (Max 150 chars) *</Label>
            <Textarea id="shortDescription" {...register('shortDescription')} maxLength={150} rows={2} />
            {errors.shortDescription && <p className="text-sm text-destructive mt-1">{errors.shortDescription.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Full Description *</Label>
            <Textarea id="description" {...register('description')} rows={5} />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}</SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="level">Difficulty Level *</Label>
               <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>{DIFFICULTY_LEVELS.map(lvl => <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>)}</SelectContent>
                  </Select>
                )}
              />
              {errors.level && <p className="text-sm text-destructive mt-1">{errors.level.message}</p>}
            </div>
             <div>
              <Label htmlFor="language">Language *</Label>
               <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                    <SelectContent>{LANGUAGES.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}</SelectContent>
                  </Select>
                )}
              />
              {errors.language && <p className="text-sm text-destructive mt-1">{errors.language.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border shadow-md bg-card">
        <CardHeader><CardTitle  className="text-xl font-headline">Pricing, Media & Options</CardTitle><CardDescription>Update course price, media URLs, and extra options.</CardDescription></CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input id="price" type="number" step="any" {...register('price')} />
                    {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
                </div>
                <div>
                    <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                    <Input id="originalPrice" type="number" step="any" {...register('originalPrice')} />
                    {errors.originalPrice && <p className="text-sm text-destructive mt-1">{errors.originalPrice.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="moneyBackGuaranteeDays">Money-Back Guarantee (Days)</Label>
                    <Input id="moneyBackGuaranteeDays" type="number" {...register('moneyBackGuaranteeDays')} />
                    {errors.moneyBackGuaranteeDays && <p className="text-sm text-destructive mt-1">{errors.moneyBackGuaranteeDays.message}</p>}
                </div>
            </div>
             <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="imageUrl">Course Thumbnail Image URL</Label>
                    <Input id="imageUrl" {...register('imageUrl')} placeholder="https://example.com/image.png"/>
                    {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
                </div>
                <div>
                    <Label htmlFor="demoVideoUrl">Public Demo Video URL (Optional)</Label>
                    <Input id="demoVideoUrl" {...register('demoVideoUrl')} placeholder="https://youtube.com/watch?v=your_demo_id"/>
                    {errors.demoVideoUrl && <p className="text-sm text-destructive mt-1">{errors.demoVideoUrl.message}</p>}
                </div>
             </div>
             <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                    <Controller name="certificateAvailable" control={control} render={({ field }) => <Checkbox id="certificateAvailable" checked={field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="certificateAvailable" className="font-normal">Certificate of Completion Available</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Controller name="freeTrialAvailable" control={control} render={({ field }) => <Checkbox id="freeTrialAvailable" checked={field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="freeTrialAvailable" className="font-normal">Offer a Free Trial Period</Label>
                </div>
            </div>
            <div>
                <Label htmlFor="downloadableMaterialsDescription">Description of Downloadable Materials (Optional)</Label>
                <Textarea id="downloadableMaterialsDescription" {...register('downloadableMaterialsDescription')} rows={2} placeholder="List any downloadable materials..."/>
                {errors.downloadableMaterialsDescription && <p className="text-sm text-destructive mt-1">{errors.downloadableMaterialsDescription.message}</p>}
            </div>
            <div>
                <Label htmlFor="detailedScheduleDescription">Detailed Schedule/Timeline (Optional)</Label>
                <Textarea id="detailedScheduleDescription" {...register('detailedScheduleDescription')} rows={4} placeholder="Provide a week-by-week schedule or module timeline..."/>
                {errors.detailedScheduleDescription && <p className="text-sm text-destructive mt-1">{errors.detailedScheduleDescription.message}</p>}
            </div>
        </CardContent>
      </Card>

      <Card className="border shadow-md bg-card">
        <CardHeader><CardTitle className="text-xl font-headline">Course Highlights</CardTitle><CardDescription>Update key takeaways or benefits.</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {highlightFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input {...register(`highlights.${index}` as const)} placeholder={`Highlight ${index + 1}`} />
              {highlightFields.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(index)} className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4"/></Button>}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => appendHighlight("")}><PlusCircle className="mr-2 h-4 w-4"/> Add Highlight</Button>
          {errors.highlights && <p className="text-sm text-destructive mt-1">{errors.highlights.message || errors.highlights.root?.message}</p>}
        </CardContent>
      </Card>

      <Card className="border shadow-md bg-card">
        <CardHeader><CardTitle className="text-xl font-headline">Curriculum *</CardTitle><CardDescription>Update modules and lessons.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {moduleFields.map((moduleField, moduleIndex) => (
            <Card key={moduleField.id} className="p-4 bg-muted/30 border">
              <div className="flex justify-between items-center mb-3">
                <Label htmlFor={`curriculum.${moduleIndex}.title`} className="text-lg font-semibold">Module {moduleIndex + 1}</Label>
                {moduleFields.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => removeModule(moduleIndex)} className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4"/></Button>}
              </div>
              <Input id={`curriculum.${moduleIndex}.title`} {...register(`curriculum.${moduleIndex}.title`)} placeholder="Module Title" className="mb-2 bg-background"/>
              {errors.curriculum?.[moduleIndex]?.title && <p className="text-sm text-destructive mb-2">{errors.curriculum[moduleIndex]?.title?.message}</p>}
               <Controller name={`curriculum.${moduleIndex}.order`} control={control} defaultValue={moduleIndex + 1} render={({ field }) => <input type="hidden" {...field} />} />

              <h4 className="font-medium text-sm mb-2 mt-4">Lessons for Module {moduleIndex+1}:</h4>
              <Accordion type="multiple" className="w-full space-y-2">
              {watchCurriculum?.[moduleIndex]?.lessons?.map((_, lessonIndex) => (
                 <AccordionItem key={`${moduleField.id}-lesson-${lessonIndex}`} value={`lesson-${moduleIndex}-${lessonIndex}`} className="border-b-0 bg-background rounded-md shadow-sm">
                     <AccordionTrigger className="hover:no-underline p-3 rounded-t-md text-sm justify-between items-center data-[state=closed]:rounded-b-md">
                        <span className="truncate">Lesson {lessonIndex + 1}: {watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.title || "New Lesson"}</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 space-y-4 border-t relative">
                       <span
                        role="button"
                        tabIndex={0}
                        className="absolute top-3 right-3 p-1 h-auto text-destructive hover:bg-destructive/10 inline-flex items-center justify-center rounded-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background z-10"
                         onClick={(e) => {
                              e.stopPropagation();
                              const lessons = watchCurriculum[moduleIndex].lessons;
                              lessons.splice(lessonIndex, 1);
                              setValue(`curriculum.${moduleIndex}.lessons`, lessons);
                          }}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const lessons = watchCurriculum[moduleIndex].lessons;
                                  lessons.splice(lessonIndex, 1);
                                  setValue(`curriculum.${moduleIndex}.lessons`, lessons);
                              }
                          }}
                          aria-label={`Delete lesson ${lessonIndex + 1}`}
                      >
                          <Trash2 className="h-3.5 w-3.5"/>
                      </span>
                      <Input {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.title`)} placeholder="Lesson Title" />
                      {errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.title && <p className="text-sm text-destructive">{errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.title?.message}</p>}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name={`curriculum.${moduleIndex}.lessons.${lessonIndex}.type`}
                            control={control}
                            render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Lesson Type" /></SelectTrigger>
                                <SelectContent>
                                    {['video', 'pdf', 'quiz', 'text', 'assignment'].map(type => <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            )}
                        />
                        <Input {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.duration`)} placeholder="Duration (e.g., 10min, 1hr)" />
                        {errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.duration && <p className="text-sm text-destructive col-span-2">{errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.duration?.message}</p>}
                      </div>
                      {(watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.type === 'video' || watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.type === 'pdf') && (
                        <div>
                            <Label htmlFor={`contentUrl-${moduleIndex}-${lessonIndex}`}>Content URL (Video/PDF)</Label>
                            <Input id={`contentUrl-${moduleIndex}-${lessonIndex}`} {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.contentUrl`)} placeholder="https://example.com/lesson_content"/>
                            {errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.contentUrl && <p className="text-sm text-destructive">{errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.contentUrl?.message}</p>}
                        </div>
                      )}
                      {watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.type === 'text' && (
                        <div>
                            <Label htmlFor={`textContent-${moduleIndex}-${lessonIndex}`}>Lesson Text Content</Label>
                            <Textarea id={`textContent-${moduleIndex}-${lessonIndex}`} {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.textContent`)} placeholder="Lesson Text Content" rows={3}/>
                        </div>
                      )}
                      <Controller name={`curriculum.${moduleIndex}.lessons.${lessonIndex}.order`} control={control} defaultValue={lessonIndex + 1} render={({ field }) => <input type="hidden" {...field} />} />
                      <div className="flex items-center space-x-2 pt-1">
                         <Controller name={`curriculum.${moduleIndex}.lessons.${lessonIndex}.isFreePreview`} control={control} render={({ field }) => <Checkbox id={`freePreview-${moduleIndex}-${lessonIndex}`} checked={field.value} onCheckedChange={field.onChange} />} />
                         <Label htmlFor={`freePreview-${moduleIndex}-${lessonIndex}`} className="text-xs font-normal">Free Preview</Label>
                      </div>
                    </AccordionContent>
                 </AccordionItem>
              ))}
              </Accordion>
              <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => {
                const lessons = watchCurriculum[moduleIndex].lessons || [];
                setValue(`curriculum.${moduleIndex}.lessons`, [...lessons, { title: "", type: "video", order: lessons.length + 1, isFreePreview: false, duration: "" }]);
              }}><PlusCircle className="mr-2 h-4 w-4"/> Add Lesson to Module {moduleIndex+1}</Button>
            </Card>
          ))}
          <Button type="button" variant="outline" onClick={() => appendModule({ title: "", order: moduleFields.length + 1, lessons: [{ title: "", type: "video", order: 1, isFreePreview: false, duration: "" }] })}><PlusCircle className="mr-2 h-4 w-4"/> Add Module</Button>
          {errors.curriculum && <p className="text-sm text-destructive mt-1">{errors.curriculum.message || errors.curriculum.root?.message}</p>}
        </CardContent>
      </Card>
      
      <Card className="border shadow-md bg-card">
        <CardHeader>
            <CardTitle className="text-xl font-headline">Course Status & Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-700">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0"/>
                <div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Important Notes</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>After saving changes, your course might be subject to re-review by admins, especially if significant modifications are made.</li>
                        <li>This ensures continued quality on the platform. Current Status: <Badge variant={initialCourseData?.approvalStatus === 'approved' ? 'success' : (initialCourseData?.approvalStatus === 'pending' ? 'warning' : 'destructive')} className="capitalize">{initialCourseData?.approvalStatus?.toUpperCase() || 'UNKNOWN'}</Badge></li>
                        <li>Ensure all information is accurate and up-to-date.</li>
                    </ul>
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg" className="px-8 py-6 text-base" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
