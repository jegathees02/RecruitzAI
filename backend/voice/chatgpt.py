from openai import OpenAI


def check_grammar(input_text):
    client = OpenAI(api_key = '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')
    model = "gpt-3.5-turbo" #"gpt-3.5-turbo-1106"
    messages = [
            {"role": "system", "content": 'You answer question about amazon Web  services.'
            },
            {"role": "user", "content": 'the user message'},
        ]
    response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0
        )
    response_message = response.choices[0].message.content
    print(response_message )
    
        # temperature=0.7,
        # max_tokens=64,
        # top_p=1
    

    # Process and use the response as needed
    # print(response['choices'][0]['message']['content'])

if __name__ == '__main__':
    check_grammar('hai')