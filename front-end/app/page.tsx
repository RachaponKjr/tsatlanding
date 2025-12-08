"use server";
import HeroBanner from "./_components/hero-banner";
import CayenneInfo from "./_components/cayenne-info";
import CayenneService from "./_components/cayenne-service";
import Promotion from "./_components/promotion";
import FAQ from "./_components/faq";
import Consult from "./_components/consult";
import Contact from "./_components/contact";
import Confidence from "./_components/confidence";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await fetch(
    `${process.env.API_URL}/api/v1/seopage/get-seo-page`,
    { method: "GET" }
  ).then((r) => r.json());
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: { canonical: data.canonical ?? undefined },
    robots: data.robots ?? undefined,

    openGraph: {
      title: data.ogTitle ?? data.title,
      description: data.ogDescription ?? data.description ?? undefined,
      images: data.ogImage
        ? [
            {
              url: data.ogImage,
              alt: data.ogImageAlt ?? "",
            },
          ]
        : undefined,
      type: data.ogType ?? "website",
      url: data.ogUrl ?? undefined,
      siteName: data.ogSiteName ?? undefined,
      locale: data.ogLocale ?? "th_TH",
    },

    twitter: {
      card: data.twitterCard ?? "summary_large_image",
      title: data.twitterTitle ?? data.title,
      description: data.twitterDescription ?? data.description ?? undefined,
      images: data.twitterImage ? [data.twitterImage] : undefined,
      site: data.twitterSite ?? undefined,
      creator: data.twitterCreator ?? undefined,
    },

    authors: data.author ? [{ name: data.author }] : undefined,
  };
}

export default async function Home() {
  const apiUrl = `${process.env.API_URL}/api/v1/cms/get-cms`;
  const { data } = await fetch(`${apiUrl}`, {
    method: "GET",
    cache: "no-cache",
  }).then((r) => r.json());

  const { data: contact } = await fetch(
    `${process.env.API_URL}/api/v1/contact/get-contact`,
    {
      method: "GET",
      cache: "no-cache",
    }
  ).then((r) => r.json());

  return (
    <>
      <HeroBanner cms={data} />
      <CayenneInfo contact={contact} cms={data} />
      <CayenneService cms={data} />
      <div className="flex flex-col gap-8 md:gap-[60px] px-4">
        <Promotion cms={data} />
        <FAQ />
      </div>
      <Consult contact={contact} cms={data} />
      <Confidence contact={contact} cms={data} />
      <Contact />
    </>
  );
}
