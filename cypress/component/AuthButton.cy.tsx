
import {OAuthButton} from "@/components/blocks/client/OauthButton"
import {Button} from "@/components/ui/button";
import {MarkdownDisplay} from "@/components/blocks/MarkdownDisplay";


type testSourceProps = {
    tag: string,
    MD: string,
    value: string
}

describe('Test MarkDown Parse Display', () => {
  it('Run through all the Markdown tag', () => {
    const testSource: testSourceProps[] = [
      {
        'tag': 'h1',
        'MD': '# HELLO WORLD H1',
        'value': 'HELLO WORLD H1'
      },
      {
        'tag': 'h2',
        'MD': '## HELLO WORLD H2',
        'value': 'HELLO WORLD H2'
      },
      {
        'tag': 'h3',
        'MD': '### HELLO WORLD H3',
        'value': 'HELLO WORLD H3'
      },
      {
        'tag': 'a',
        'MD': '\n[click me](https://www.google.com)\n',
        'value': 'click me'
      },
      {
        'tag': '.language-python',
        'MD': "```python\nprint(\'hello world\')\n```",
        'value': "print(\'hello world\')\n"
      },
      {
        'tag': 'img',
        'MD': '![image](https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png)',
        'value': '' // image tag does not have text
      }
    ]
    const source = testSource.map((test) => test.MD).join('\n')
    cy.mount(<MarkdownDisplay source={source}/>)
    for (const test of testSource) {
        cy.get(test.tag).should('have.text', test.value)
    }
  })
})