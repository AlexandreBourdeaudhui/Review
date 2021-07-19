const dataEmpty = [];

const justAllCommented = [
    {
      id: 708278285,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA4Mjc4Mjg1',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/362#pullrequestreview-708278285',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/362',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-16T11:32:11Z',
      commit_id: 'bd01b30e105e005a074ea7f1027fe557716b1e16'
    },
    {
      id: 708279094,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA4Mjc5MDk0',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/362#pullrequestreview-708279094',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/362',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-16T11:32:47Z',
      commit_id: 'bd01b30e105e005a074ea7f1027fe557716b1e16'
    },
    {
      id: 708279687,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA4Mjc5Njg3',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/362#pullrequestreview-708279687',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/362',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-16T11:33:12Z',
      commit_id: 'eabdae2f0e2737f6591dd3a0b119d0bb8d88413c'
    }
  ]

  const justOneCommentPlease = [
    {
      id: 576246228,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NTc2MjQ2MjI4',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/81#pullrequestreview-576246228',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/81',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-01-26T11:09:43Z',
      commit_id: '7d79df2c39b2714dc6a68c0a8d33523d1c7d1268'
    }
  ]

  const fullReviewButLastApproved = [
    {
      id: 703790541,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzAzNzkwNTQx',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/346#pullrequestreview-703790541',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/346',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-12T07:21:34Z',
      commit_id: 'c0d4cf939337727d5930966a6836e816a3a3492b'
    },
    {
      id: 707140491,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA3MTQwNDkx',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/346#pullrequestreview-707140491',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/346',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-15T09:36:04Z',
      commit_id: '017d74f083b8aba6a70d4d1dc666015df1d173f4'
    },
    {
      id: 707303129,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA3MzAzMTI5',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/346#pullrequestreview-707303129',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/346',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-15T12:43:45Z',
      commit_id: '128fbb0696c5f190fd61ba3e68a7491a9284390b'
    },
    {
      id: 707325145,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA3MzI1MTQ1',
      user: [Object],
      body: "Hormis mes commentaires sur la PR (notamment les erreurs en console 😅 ), c'est fonctionnel et ça marche plutôt bien. J'ai pas mieux comme idée pour le positionnement, désolé Alex 🙏 ",
      state: 'APPROVED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/346#pullrequestreview-707325145',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/346',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-15T13:04:45Z',
      commit_id: '128fbb0696c5f190fd61ba3e68a7491a9284390b'
    }
  ]

  const approvedFirstButDeniedLast = [
    {
      id: 576246228,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NTc2MjQ2MjI4',
      user: [Object],
      body: '',
      state: 'COMMENTED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/123456#pullrequestreview-576246228',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/123456',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-01-26T11:09:43Z',
      commit_id: '7d79df2c39b2714dc6a68c0a8d33523d1c7d1268'
    },
    {
      id: 707325145,
      node_id: 'MDE3OlB1bGxSZXF1ZXN0UmV2aWV3NzA3MzI1MTQ1',
      user: [Object],
      body: "Hormis mes commentaires sur la PR (notamment les erreurs en console 😅 ), c'est fonctionnel et ça marche plutôt bien. J'ai pas mieux comme idée pour le positionnement, désolé Alex 🙏 ",
      state: 'APPROVED',
      html_url: 'https://github.com/O-clock-Dev/classroom/pull/123456#pullrequestreview-707325145',
      pull_request_url: 'https://api.github.com/repos/O-clock-Dev/classroom/pulls/123456',
      author_association: 'CONTRIBUTOR',
      _links: [Object],
      submitted_at: '2021-07-15T13:04:45Z',
      commit_id: '128fbb0696c5f190fd61ba3e68a7491a9284390b'
    }
  ]