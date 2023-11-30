import { Page } from '@playwright/test';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';

export class FeedbackMocks {
  constructor(private page: Page) {}

  async mockSocialChannelsFeedbackData(channel: string): Promise<InboxPage> {
    const inboxPage = new InboxPage(this.page);
    const mockedUrl = `${channel}/b8aa5284-3cb8-46bb-ba2e-76cd6062xmockx`;
    inboxPage.url = `inbox/stories/story/${mockedUrl}/review`;

    // with this option test should be long because it need time to mock data
    await this.page.route(`*/**/api/v1/story/moderator/${mockedUrl}`, async (route) => {
      const json = socialChannelsMockedData;
      json.channel = channel;
      await route.fulfill({ json });
    });

    const request = this.page.waitForResponse(`*/**/api/v1/story/moderator/${mockedUrl}`);
    await inboxPage.goto();
    const response = await request;
    response.ok();
    return new InboxPage(this.page);
  }
}

const socialChannelsMockedData = {
  id: 'b8aa5284-3cb8-46bb-ba2e-76cd6062xmockx',
  content: '\nEnglish\nMocked data for testing purposes',
  publishedAt: null,
  place: null,
  channel: '',
  authorNickname: 'John Doe',
  country: 'ax',
  countryId: 2,
  organisations: [],
  votes: 0,
  views: 0,
  comments: 0,
  user: null,
  language: 'en',
  translations: [
    {
      content: '\nEnglish\nMocked data for testing purposes',
      code: 'en',
      type: 'manual',
      status: 2,
    },
  ],
  thematics: [37],
  categories: [
    {
      id: 1,
      code: 'thanks',
      order: 1,
    },
  ],
  difficulties: [],
  maternityStatus: [],
  historicalContent: '\nEnglish\nMocked data for testing purposes',
  contactAccepted: true,
  age: 0,
  gender: 0,
  createdAt: '2023-01-16T13:07:07.839Z',
  emailProvided: false,
  isSensitive: false,
  markedAsSensitiveBy: null,
  caseManagerNote: null,
  status: 'pending_publication',
  caseManagerReturnedAt: null,
  messages: [
    {
      id: 5891,
      content: '👋 Hi! This is an automated service to share feedback on your experience with organisations in your area.',
      isPinned: false,
      sender: {
        type: 'loop',
        id: null,
      },
      createdAt: '2023-01-16T13:07:07.754Z',
    },
    {
      id: 5892,
      content: 'What language do you speak?',
      isPinned: false,
      sender: {
        type: 'loop',
        id: null,
      },
      createdAt: '2023-01-16T13:07:07.764Z',
    },
    {
      id: 5893,
      content: 'U can Pin this Message English',
      isPinned: false,
      sender: {
        type: 'issuer',
        id: null,
        username: 'ewqf',
      },
      createdAt: '2023-01-16T13:07:07.775Z',
    },
    {
      id: 5894,
      content: 'If your story is sensitive please go to: https://app.talktoloop.org/new-story',
      isPinned: false,
      sender: {
        type: 'loop',
        id: null,
      },
      createdAt: '2023-01-16T13:07:07.784Z',
    },
    {
      id: 5895,
      content: 'Otherwise, please share your story now.',
      isPinned: false,
      sender: {
        type: 'loop',
        id: null,
      },
      createdAt: '2023-01-16T13:07:07.794Z',
    },
    {
      id: 5896,
      storyId: 'b8aa5284-3cb8-46bb-ba2e-76cd6062xmockx',
      content: 'Mocked data for testing purposes',
      isPinned: false,
      sender: {
        type: 'issuer',
        id: null,
        username: 'ewqf',
      },
      createdAt: '2023-01-16T13:07:07.805Z',
    },
    {
      id: 5897,
      content:
        'Ok, the more information you share the more people might reply. For example:\n🏛️  Organisation name(s)\n🌏️  Country and location of story',
      isPinned: false,
      sender: {
        type: 'loop',
        id: null,
      },
      createdAt: '2023-01-16T13:07:07.818Z',
    },
    {
      id: 5898,
      content:
        "Thanks for using TalkToLoop.org to raise your voice and create positive change. We will now review and publish your story within 24-48 hours, usually much quicker. We will send you replies when we get them.\n\nGoodbye.\n\nTo start again type 'Loop' or tap the button below at any time 😃.",
      isPinned: false,
      sender: {
        type: 'loop',
        id: null,
      },
      createdAt: '2023-01-16T13:07:07.927Z',
    },
    {
      id: 2893,
      content: 'Pin second ',
      isPinned: false,
      sender: {
        type: 'issuer',
        id: null,
        username: 'ewqf',
      },
      createdAt: '2023-01-16T13:07:07.775Z',
    },
  ],
};
