const messageList = [
  {
    messages: [
      {
        messageMedia: {
          imgSrc: 'https://source.unsplash.com/random',
          alt: 'random'
        },
        messageText: {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        },
        date: '21:38'
      },
      {
        messageMedia: {},
        messageText: {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        },
        date: '22:39'
      }
    ],
    isOwn: false,
    avatar: 'https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg',
    authorName: 'Jon Smith'
  },
  {
    messages: [
      {
        messageMedia: {
          imgSrc: 'https://source.unsplash.com/random',
          alt: 'random'
        },
        messageText: {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        },
        date: '22:45'
      }
    ],
    isOwn: true,
    avatar: 'https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg',
    authorName: 'Brandon'
  }
];

export default messageList;
