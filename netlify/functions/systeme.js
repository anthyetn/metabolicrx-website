exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, firstName, lastName, phone, quizScore } = JSON.parse(event.body);

    const response = await fetch('https://api.systeme.io/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'piuhcrolzcyyitizp0gmk9ap0yfofsyf8kee57n0jif9ry4bytbxm7rr0ay1xxop'
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        fields: [
          { slug: 'phone', value: phone || '' },
          { slug: 'quiz_score', value: quizScore || '' }
        ],
        tags: ['TRT']
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, data })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
