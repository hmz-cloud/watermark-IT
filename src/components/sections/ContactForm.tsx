"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ChevronDown, CircleCheck, Send } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

const serviceOptions = ["cctv", "pos", "smartHome", "it", "other"] as const;

/**
 * Validation schema. Messages are *translation keys*, not text, so the same
 * schema works for both locales; the UI resolves them with t().
 */
const schema = z.object({
  name: z.string().trim().min(2, "name"),
  // Accept local (05…) and international (+966…) formats; count digits only.
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 9 && digits.length <= 15;
    }, "phone"),
  email: z.union([z.literal(""), z.string().trim().email("email")]),
  service: z.enum(serviceOptions, { message: "service" }),
  message: z.string().trim().min(10, "message"),
});

type FormValues = z.input<typeof schema>;
type FieldName = keyof FormValues;

const inputBase =
  "block w-full rounded-[var(--radius-control)] border bg-white px-4 text-base text-ink " +
  "placeholder:text-muted/70 transition-colors duration-200 " +
  "focus:outline-none focus-visible:outline-none focus:border-brand focus:ring-2 focus:ring-brand/25";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched", // validate on blur, then live once a field has been touched
    defaultValues: { name: "", phone: "", email: "", service: "" as FormValues["service"], message: "" },
  });

  /**
   * No backend yet: the request is handed to WhatsApp as a prefilled message.
   * To switch to email/CRM later, POST `values` to an API route here instead.
   */
  const onSubmit = (values: FormValues) => {
    const text = t("whatsappTemplate", {
      name: values.name,
      phone: values.phone,
      email: values.email || "—",
      service: t(`options.${values.service}`),
      message: values.message,
    });
    const url = whatsappLink(text);
    // If a popup blocker stops the new tab, fall back to same-tab navigation.
    // (No "noopener" feature string: it makes window.open always return null.)
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.assign(url);
    setSent(true);
  };

  // Shared ARIA wiring for each field: label, hint and error ids.
  const fieldProps = (name: FieldName, hint?: boolean) => ({
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      clsx(hint && `contact-${name}-hint`, errors[name] && `contact-${name}-error`) || undefined,
    className: clsx(inputBase, errors[name] ? "border-danger" : "border-field"),
  });

  const renderLabel = (name: FieldName, optional = false) => (
    <label htmlFor={`contact-${name}`} className="mb-2 block text-sm font-medium text-ink">
      {t(name)}
      {optional ? (
        <span className="ms-1.5 font-normal text-muted">({t("optional")})</span>
      ) : (
        <span className="ms-0.5 text-danger" aria-hidden="true">*</span>
      )}
    </label>
  );

  const renderError = (name: FieldName) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} role="alert" className="mt-1.5 text-sm text-danger">
        {t(`errors.${name}`)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        {renderLabel("name")}
        <input type="text" autoComplete="name" {...register("name")} {...fieldProps("name")} className={clsx(fieldProps("name").className, "h-12")} />
        {renderError("name")}
      </div>

      <div>
        {renderLabel("phone")}
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          {...register("phone")}
          {...fieldProps("phone", true)}
          className={clsx(fieldProps("phone").className, "h-12 rtl:text-right")}
        />
        <p id="contact-phone-hint" className="mt-1.5 text-sm text-muted">{t("phoneHint")}</p>
        {renderError("phone")}
      </div>

      <div>
        {renderLabel("email", true)}
        <input
          type="email"
          autoComplete="email"
          dir="ltr"
          {...register("email")}
          {...fieldProps("email")}
          className={clsx(fieldProps("email").className, "h-12 rtl:text-right")}
        />
        {renderError("email")}
      </div>

      <div className="sm:col-span-2">
        {renderLabel("service")}
        <div className="relative">
          <select
            {...register("service")}
            {...fieldProps("service")}
            className={clsx(fieldProps("service").className, "h-12 cursor-pointer appearance-none pe-11")}
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {t(`options.${opt}`)}
              </option>
            ))}
          </select>
          {/* `end-3` places the chevron on the correct side in both directions. */}
          <ChevronDown className="pointer-events-none absolute end-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        </div>
        {renderError("service")}
      </div>

      <div className="sm:col-span-2">
        {renderLabel("message")}
        <textarea
          rows={5}
          placeholder={t("messagePlaceholder")}
          {...register("message")}
          {...fieldProps("message")}
          className={clsx(fieldProps("message").className, "resize-y py-3 leading-relaxed")}
        />
        {renderError("message")}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          icon={<Send className="size-5 rtl:-scale-x-100" aria-hidden="true" />}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>

        {/* Polite live region: announces the outcome without stealing focus. */}
        <p aria-live="polite" className="text-sm text-success">
          {sent && (
            <span className="inline-flex items-start gap-2">
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t("success")}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
