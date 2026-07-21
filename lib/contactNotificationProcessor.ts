import {
  claimContactNotificationJobs,
  markContactNotificationJobFailed,
  markContactNotificationJobSent,
  markContactNotificationJobSkipped,
  type ContactNotificationJob,
} from "@/lib/contactSubmissions";
import { sendContactEmailNotification } from "@/lib/emailNotifications";
import { sendContactWhatsAppNotification } from "@/lib/whatsappNotifications";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown notification error.";
}

function toNotificationInput(job: ContactNotificationJob) {
  return {
    id: job.submissionId,
    name: job.name,
    email: job.email,
    focus: job.focus,
    budget: job.budget,
    message: job.message,
    createdAt: job.createdAt,
    attribution: job.attribution,
  };
}

async function processJob(job: ContactNotificationJob) {
  try {
    const result =
      job.channel === "email"
        ? await sendContactEmailNotification(toNotificationInput(job))
        : await sendContactWhatsAppNotification(toNotificationInput(job));

    if (result.status === "skipped") {
      await markContactNotificationJobSkipped(job, result.reason);
      return "skipped" as const;
    }

    await markContactNotificationJobSent(job, result.messageId);
    return "sent" as const;
  } catch (error) {
    console.error(`${job.channel} contact notification failed`, error);
    await markContactNotificationJobFailed(job, getErrorMessage(error));
    return "failed" as const;
  }
}

export async function processContactNotificationJobs(limit = 4) {
  const jobs = await claimContactNotificationJobs(limit);
  const results = await Promise.all(jobs.map(processJob));

  return {
    claimed: jobs.length,
    sent: results.filter((result) => result === "sent").length,
    skipped: results.filter((result) => result === "skipped").length,
    failed: results.filter((result) => result === "failed").length,
  };
}
