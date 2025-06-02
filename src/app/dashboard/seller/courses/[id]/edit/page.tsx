
"use client";

import { useState, useEffect }
from 'react';
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
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { getCourseById } from '@/lib/placeholder-data'; // Assuming this fetches course data
import type { Course } from '@/lib/types';
import { cn } from '@/lib/utils';

// Schemas are identical to new course page
const lessonSchema = z.object({
  id: z.string().optional(), // Existing lessons will have an ID
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  type: z.enum(['video', 'pdf', 'quiz', 'text', 'assignment']),
  duration: z.string().optional(),
  contentUrl: z.string().url().optional().or(z.literal('')),
  textContent: z.string().optional(),
  order: z.number().int().min(1),
  isFreePreview: z.boolean().default(false),
});

const moduleSchema = z.object({
  id: z.string().optional(), // Existing modules will have an ID
  title: z.string().min(3, "Module title must be at least 3 characters"),
  lessons: z.array(lessonSchema).min(1, "Module must have at least one lesson"),
  order: z.number().int().min(1),
});

const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  shortDescription: z.string().min(20).max(150),
  description: z.string().min(50),
  category: z.string().min(1),
  level: z.enum(DIFFICULTY_LEVELS as [string, ...string[]]),
  language: z.string().min(1),
  price: z.coerce.number().min(0),
  originalPrice: z.coerce.number().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  videoPreviewUrl: z.string().url().optional().or(z.literal('')),
  certificateAvailable: z.boolean().default(false),
  highlights: z.array(z.string().min(3)).optional(),
  curriculum: z.array(moduleSchema).min(1),
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
      const courseData = getCourseById(courseId); // Fetch existing course data
      if (courseData) {
        setInitialCourseData(courseData);
        reset({ // Populate form with existing data
          ...courseData,
          highlights: courseData.highlights || ["", "", ""],
          curriculum: courseData.curriculum?.map(m => ({
            ...m,
            lessons: m.lessons.map(l => ({...l})) || []
          })) || [{ title: "", order: 1, lessons: [{ title: "", type: "video", order: 1, isFreePreview: false }] }],
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
      description: `"${data.title}" has been updated.`,
    });
    setIsLoading(false);
    router.push('/dashboard/seller/courses');
  };

  if (!initialCourseData && courseId) { // Still loading or course not found
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>;
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Edit Course: {initialCourseData?.title}</h1>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>

      {/* Re-use Card components from NewCoursePage, binding with register and control */}
      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Course Title</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="shortDescription">Short Description (Max 150 chars)</Label>
            <Textarea id="shortDescription" {...register('shortDescription')} maxLength={150} rows={2} />
            {errors.shortDescription && <p className="text-sm text-destructive mt-1">{errors.shortDescription.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea id="description" {...register('description')} rows={5} />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
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
              <Label htmlFor="level">Difficulty Level</Label>
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
              <Label htmlFor="language">Language</Label>
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
      
      {/* Pricing & Media Card */}
       <Card>
        <CardHeader><CardTitle>Pricing & Media</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="price">Price ($)</Label><Input id="price" type="number" step="0.01" {...register('price')} />{errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}</div>
                <div><Label htmlFor="originalPrice">Original Price (Optional)</Label><Input id="originalPrice" type="number" step="0.01" {...register('originalPrice')} />{errors.originalPrice && <p className="text-sm text-destructive mt-1">{errors.originalPrice.message}</p>}</div>
            </div>
             <div><Label htmlFor="imageUrl">Course Thumbnail Image URL</Label><Input id="imageUrl" {...register('imageUrl')} placeholder="https://example.com/image.png"/>{errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}</div>
             <div><Label htmlFor="videoPreviewUrl">Video Preview URL (Optional)</Label><Input id="videoPreviewUrl" {...register('videoPreviewUrl')} placeholder="https://example.com/video_preview.mp4"/>{errors.videoPreviewUrl && <p className="text-sm text-destructive mt-1">{errors.videoPreviewUrl.message}</p>}</div>
             <div className="flex items-center space-x-2">
                <Controller name="certificateAvailable" control={control} render={({ field }) => <Checkbox id="certificateAvailable" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="certificateAvailable">Certificate of Completion Available</Label>
            </div>
        </CardContent>
      </Card>

      {/* Highlights Card */}
      <Card>
        <CardHeader><CardTitle>Course Highlights</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {highlightFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input {...register(`highlights.${index}`)} placeholder={`Highlight ${index + 1}`} />
              {highlightFields.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => appendHighlight("")}><PlusCircle className="mr-2 h-4 w-4"/> Add Highlight</Button>
          {errors.highlights && <p className="text-sm text-destructive mt-1">{errors.highlights.message}</p>}
        </CardContent>
      </Card>

      {/* Curriculum Card - This is more complex due to nested arrays */}
      <Card>
        <CardHeader><CardTitle>Curriculum</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {moduleFields.map((moduleField, moduleIndex) => (
            <Card key={moduleField.id} className="p-4 bg-muted/30">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor={`curriculum.${moduleIndex}.title`} className="text-lg font-semibold">Module {moduleIndex + 1}</Label>
                {moduleFields.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => removeModule(moduleIndex)}><Trash2 className="h-4 w-4 text-destructive"/></Button>}
              </div>
              <Input id={`curriculum.${moduleIndex}.title`} {...register(`curriculum.${moduleIndex}.title`)} placeholder="Module Title" className="mb-2 bg-background"/>
              {errors.curriculum?.[moduleIndex]?.title && <p className="text-sm text-destructive mb-2">{errors.curriculum[moduleIndex]?.title?.message}</p>}
               <Controller name={`curriculum.${moduleIndex}.order`} control={control} defaultValue={moduleIndex + 1} render={({ field }) => <input type="hidden" {...field} />} />

              <h4 className="font-medium text-sm mb-1 mt-3">Lessons:</h4>
              <Accordion type="multiple" className="w-full">
              {watchCurriculum?.[moduleIndex]?.lessons?.map((_, lessonIndex) => (
                 <AccordionItem key={`${moduleField.id}-lesson-${lessonIndex}`} value={`lesson-${moduleIndex}-${lessonIndex}`} className="border-b-0">
                    <AccordionTrigger className="bg-background hover:no-underline p-2 rounded-md text-sm justify-start">
                        <span>Lesson {lessonIndex + 1}: {watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.title || "New Lesson"}</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 space-y-3 border rounded-b-md mt-[-1px] bg-background relative">
                      <span
                          role="button"
                          tabIndex={0}
                          className="absolute top-3 right-3 p-1 h-auto text-destructive hover:bg-destructive/10 inline-flex items-center justify-center rounded-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background"
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
                          <Trash2 className="h-3 w-3"/>
                      </span>
                      <Input {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.title`)} placeholder="Lesson Title" />
                      {errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.title && <p className="text-sm text-destructive">{errors.curriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.title?.message}</p>}
                      <div className="grid grid-cols-2 gap-3">
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
                        <Input {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.duration`)} placeholder="Duration (e.g., 10min)" />
                      </div>
                      {(watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.type === 'video' || watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.type === 'pdf') && (
                        <Input {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.contentUrl`)} placeholder="Content URL (Video/PDF)" />
                      )}
                      {watchCurriculum?.[moduleIndex]?.lessons?.[lessonIndex]?.type === 'text' && (
                        <Textarea {...register(`curriculum.${moduleIndex}.lessons.${lessonIndex}.textContent`)} placeholder="Lesson Text Content" rows={3}/>
                      )}
                      <Controller name={`curriculum.${moduleIndex}.lessons.${lessonIndex}.order`} control={control} defaultValue={lessonIndex + 1} render={({ field }) => <input type="hidden" {...field} />} />
                      <div className="flex items-center space-x-2">
                         <Controller name={`curriculum.${moduleIndex}.lessons.${lessonIndex}.isFreePreview`} control={control} render={({ field }) => <Checkbox id={`freePreview-${moduleIndex}-${lessonIndex}`} checked={field.value} onCheckedChange={field.onChange} />} />
                         <Label htmlFor={`freePreview-${moduleIndex}-${lessonIndex}`} className="text-xs">Free Preview</Label>
                      </div>
                    </AccordionContent>
                 </AccordionItem>
              ))}
              </Accordion>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => {
                const lessons = watchCurriculum[moduleIndex].lessons || [];
                setValue(`curriculum.${moduleIndex}.lessons`, [...lessons, { title: "", type: "video", order: lessons.length + 1, isFreePreview: false }]);
              }}><PlusCircle className="mr-2 h-4 w-4"/> Add Lesson</Button>
            </Card>
          ))}
          <Button type="button" variant="outline" onClick={() => appendModule({ title: "", order: moduleFields.length + 1, lessons: [{ title: "", type: "video", order: 1, isFreePreview: false }] })}><PlusCircle className="mr-2 h-4 w-4"/> Add Module</Button>
          {errors.curriculum && <p className="text-sm text-destructive mt-1">{errors.curriculum.message || errors.curriculum.root?.message}</p>}
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
