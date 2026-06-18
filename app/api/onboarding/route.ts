import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getPrisma } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    // 1. التأكد من هوية الطالب عبر Clerk
    const user = await currentUser();
    if (!user) {
      console.log("خطأ: لا يوجد مستخدم مسجل دخول!");
      return new NextResponse("غير مصرح لك", { status: 401 });
    }

    // 2. استلام البيانات من المتصفح
    const body = await req.json();
    
    // --- أجهزة التنصت لمعرفة أين يقف الخطأ ---
    console.log("====================================");
    console.log("1. تم استلام الطلب من المتصفح بنجاح!");
    console.log("2. رقم المستخدم من Clerk هو:", user.id);
    console.log("3. البيانات التي وصلت من الواجهة هي:", body);
    console.log("====================================");
    // -----------------------------------------

    const { firstName, fatherName, birthYear } = body;
    const email = user.emailAddresses[0]?.emailAddress || "";

    const db = getPrisma();
    console.log("4. جاري الاتصال بقاعدة بيانات Neon...");

    // 3. الحفظ الآمن (تحديث إذا كان موجوداً، أو إنشاء جديد إذا لم يكن موجوداً)
    const updatedUser = await db.user.upsert({
      where: {
        clerkId: user.id,
      },
      update: {
        firstName,
        fatherName,
        birthYear,
        onboardingComplete: true,
      },
      create: {
        clerkId: user.id,
        email: email,
        firstName,
        fatherName,
        birthYear,
        onboardingComplete: true,
      },
    });

    console.log("5. تم الحفظ في قاعدة البيانات بنجاح تام! 🚀");
    console.log("بيانات المستخدم المحدثة:", updatedUser.id);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[ONBOARDING_ERROR] تفاصيل الخطأ السري:", error);
    return new NextResponse("خطأ داخلي في السيرفر", { status: 500 });
  }
}