// import { expect, test } from '@playwright/test';
// import { prepareRandomFeedbackData } from 'playwright-src/factories/provide-feedback.factory';
// import { RejectFeedbackModal } from 'playwright-src/modals/reject-feedback.modal';
// import { InboxPage } from 'playwright-src/pages/inbox.pages';
// import { ProvideFeedbackPage } from 'playwright-src/pages/provide-feedback.pages';
// import { loginAdminViaImap } from 'playwright-src/test-data/user.data';
// import { ReviewFeedbackView } from 'playwright-src/views/review-feedback.view';
//TODO:

// //TODO:
// // Edit feedback
// // Publish edited feedback
// // Edit feedback and change some
// test.describe('Verify edited feedback, publish, reject, edit', () => {
//   test.use({
//     storageState: loginAdminViaImap.path,
//   });

//   let provideFeedbackPage: ProvideFeedbackPage;
//   let inboxPage: InboxPage;
//   let reviewFeedbackView: ReviewFeedbackView;
//   let rejectFeedbackModal: RejectFeedbackModal;

//   test.beforeEach(async ({ page }) => {
//     provideFeedbackPage = new ProvideFeedbackPage(page);
//     inboxPage = new InboxPage(page);
//     reviewFeedbackView = new ReviewFeedbackView(page);
//     rejectFeedbackModal = new RejectFeedbackModal(page);

//     await provideFeedbackPage.goto();
//     await provideFeedbackPage.closeModal();
//     const contentData = prepareRandomFeedbackData();
//     await provideFeedbackPage.provideFeedbackWithAllFields(contentData);

//     await expect(provideFeedbackPage.alertPopUpFeedbackSubmitted, 'Alert popup feedback is created is displayed').toBeVisible();

//     await inboxPage.goto();
//     await inboxPage.openFeedback.first().click();
//   });

//   test('Edit published feedback @LOOP_R03_01', async ({}) => {
//     // Act
//     await reviewFeedbackView.publishFeedback();

//     //Assert
//     await expect(inboxPage.feedbackPublishedPopUp).toBeVisible();

//       //TODO:;
//   });

//   // test('Reject feedback @LOOP_R03_02', async ({}) => {
//   //   // Act
//   //   await reviewFeedbackView.rejectButton.click();
//   //   await rejectFeedbackModal.selectReasonAndRejectFeedback();

//   //   // Assert
//   //   await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeVisible();
//   // });
// });

