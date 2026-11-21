import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { leadSchema, type LeadValues } from "@/lib/lead-schema";
import { leadForm, type Interest } from "@/content/global";
import { Button } from "@/components/system/primitives";
import { cn } from "@/lib/utils";

const fieldBase =
  "peer h-14 w-full rounded-md border border-line-strong bg-surface-2 px-4 pt-5 pb-1.5 text-[15px] text-foreground placeholder-transparent outline-none transition-[border-color,box-shadow] focus:border-orange focus:shadow-[0_0_0_2px_var(--orange),var(--glow-sm)] aria-[invalid=true]:border-destructive";
const labelBase =
  "pointer-events-none absolute left-4 right-3 truncate top-1.5 text-xs font-medium text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-amber";

function Field({ id, label, error, children, required }: { id: string; label: string; error?: string | undefined; children: ReactNode; required?: boolean }) {
  return (
    <div>
      <div className="relative">
        {children}
        <label htmlFor={id} className={labelBase}>{label}{required && <span aria-hidden className="text-amber"> *</span>}</label>
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 pl-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function LeadForm({ defaultInterest = "Full Ecosystem", idPrefix = "lead" }: { defaultInterest?: Interest; idPrefix?: string }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { interest: defaultInterest, name: "", email: "", phone: "", company: "", goal: "", website: "" },
  });
  const f = leadForm.fields;
  const id = (k: string) => `${idPrefix}-${k}`;
  const aria = (k: keyof LeadValues) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${id(k)}-err` : undefined });

  const onSubmit = async (values: LeadValues) => {
    if (values.website) return; // honeypot tripped
    // TODO: POST to endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setDone(true);
  };

  if (done) {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid size-20 place-items-center rounded-full bg-grad shadow-glow-lg">
          <Check className="size-9 text-ink" strokeWidth={2.5} aria-hidden />
        </motion.div>
        <h3 className="mt-6 type-h3">{leadForm.successTitle}</h3>
        <p className="mt-2 text-muted-foreground">{leadForm.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field id={id("name")} label={f.name} error={errors.name?.message} required>
        <input id={id("name")} autoComplete="name" placeholder={f.name} className={fieldBase} {...aria("name")} {...register("name")} />
      </Field>
      <Field id={id("email")} label={f.email} error={errors.email?.message} required>
        <input id={id("email")} type="email" autoComplete="email" placeholder={f.email} className={fieldBase} {...aria("email")} {...register("email")} />
      </Field>
      <div>
        <div className="relative flex">
          <span className="z-10 grid h-14 place-items-center rounded-l-md border border-r-0 border-line-strong bg-surface-3 px-3.5 type-mono text-foreground" aria-hidden>+91</span>
          <div className="relative flex-1">
            <input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel-national" placeholder={f.phone} className={cn(fieldBase, "rounded-l-none")} {...aria("phone")} {...register("phone")} />
            <label htmlFor={id("phone")} className={labelBase}>{f.phone}<span aria-hidden className="text-amber"> *</span></label>
          </div>
        </div>
        {errors.phone && <p id={`${id("phone")}-err`} role="alert" className="mt-1.5 pl-1 text-sm text-destructive">{errors.phone.message}</p>}
      </div>
      <Field id={id("company")} label={f.company} error={errors.company?.message}>
        <input id={id("company")} autoComplete="organization" placeholder={f.company} className={fieldBase} {...register("company")} />
      </Field>
      <div className="relative sm:col-span-2">
        <select id={id("interest")} className={cn(fieldBase, "appearance-none pr-10")} {...register("interest")}>
          {leadForm.interests.map((i) => <option key={i} value={i} className="bg-surface-2">{i}</option>)}
        </select>
        <label htmlFor={id("interest")} className="pointer-events-none absolute left-4 top-1.5 text-xs font-medium text-muted-foreground">{f.interest}</label>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      </div>
      <div className="relative sm:col-span-2">
        <textarea id={id("goal")} rows={3} placeholder={f.goal} className={cn(fieldBase, "h-auto min-h-28 resize-none pt-6")} {...register("goal")} />
        <label htmlFor={id("goal")} className={labelBase}>{f.goal}</label>
      </div>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">{leadForm.submit}</Button>
        <p className="mt-3 text-sm text-muted-foreground">{leadForm.micro}</p>
      </div>
    </form>
  );
}
