import * as React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { css, Global, ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { IconContext } from '@react-icons/all-files'
import { getSiteConfig } from '@/lib/get-config-value';
import { font, colors, themename } from '@/lib/config';
import { get } from 'http'

export const Root = styled.body`
`;

export const theme = {
  ...colors
}

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='en'>
          <Head>
            <link rel='shortcut icon' href='/favicon.ico' />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='favicon.png'
            />

            <link rel='manifest' href='/manifest.json' />
          </Head>

          <Root>
            <ThemeProvider theme={theme}>
              {
                font && (
                  <Global 
                      styles={[
                        css`
                          @import url(${font.link});
                        `,
                        {
                          "*": {
                            "--notion-font": `${font.name}`,
                          }
                        },
                    ]}
                  />
                )
              }              
              {
                colors && (
                  <Global
                    styles={{
                      'body': {
                        "--primary-color": `${colors.light.primary}`,
                        "color": "var(--primary-color)",
                        "&.dark-mode": {
                          "--primary-color": `${colors.dark.primary}`,
                          "color": "var(--primary-color)",
                        }
                      }
                    }}
                  />
                )
              }
              {
                themename &&
                themename === 'College' &&
                 ( 
                 <Global styles={css`
                  .notion-title {
                    text-transform: uppercase;
                    position: absolute !important;
                    width: 1px !important;
                    height: 1px !important;
                    padding: 0 !important;
                    overflow: hidden !important;
                    clip: rect(0, 0, 0, 0) !important;
                    white-space: nowrap !important;
                    border: 0 !important;
                  }
                  
                  .notion-header {
                    .notion-nav-header {
                      max-width: 75rem;
                      padding: 0;
                    }
                  }
                  
                  footer {
                    max-width: 75rem !important;
                    padding: 0;
                  }
                  
                  .index-page {
                    --notion-max-width: 100%;
                    padding: 0;

                    &.notion-page-no-cover {
                      margin: 0px !important;
                    }
                  
                    article.notion-page-content-inner {
                      >* {
                        padding: 2rem calc((100% - 75rem)/2);
                        // margin: 2rem auto 2rem;
                      }
                  
                      >div {
                        .medium-zoom-image {
                          border-radius: 25px;
                        }
                        &:nth-child(1) {
                          .notion-link { 
                            border: 1px solid var(--primary-color);
                            background-color: var(--primary-color);
                            color: var(--select-color-2);
                            font-size: 0.83em;
                            border-radius: 1em;
                            padding: 0.75em 2em;
                            text-decoration: none;
                            text-transform: uppercase;
                            font-weight: 700;
                            &:focus,
                            &:hover {
                              // background: none;
                              text-decoration: underline;
                              filter: brightness(150%);
                            }
                          }
                        }
                        &:nth-child(2) {
                          max-width: 100%;
                          max-height: 120px;
                          padding: 2rem;
                          max-height: calc(90px + 4rem);
                          background-color: var(--primary-color);

                          .medium-zoom-image {
                            border-radius: 5px;
                          }
                        }
                  
                        &:nth-child(5) {
                          background-color: var(--fg-color);
                          color: var(--bg-color-1);
                        }
                  
                        &:nth-child(6) {
                          background-color: var(--fg-color);
                          color: var(--bg-color-1);
                          align-items: flex-start;
                          .notion-h-title span {
                            color: var(--primary-color);
                          }
                        }

                        &:nth-child(8) {
                          video {
                            border-radius: 25px;
                          }
                        }
                  
                        &:nth-child(4) {
                          align-items: flex-start;
                  
                          >.notion-column {
                            padding: 1rem;
                            border: 2px solid var(--bg-color-1);
                            border-radius: 25px;
                  
                            .notion-h3,
                            &+div {
                              margin: 0.75rem 0;
                            }
                  
                            &:nth-child(1) {
                              .notion-h1 {
                                font-size: 3em;
                                line-height: 1.2em;
                                margin-bottom: 0.5em;
                              }
                            }
                          }
                        }
                      }
                    }
                  
                      {
                      .notion-row {
                        .notion-column {
                          figure {
                            min-width: 64px;
                          }
                        }
                  
                          {
                  
                          // {
                          .notion-h3 {
                            + {
                              div {
                                // margin: 0;
                              }
                            }
                          }
                        }
                      }
                  
                      .notion-column {
                        padding-top: 0;
                        padding-bottom: 0;
                      }
                    }
                  
                    &:nth-child(1) {
                      figure {
                        align-self: flex-start;
                      }
                    }
                  
                    &:last-child {
                      figure {
                        align-self: flex-end;
                      }
                    }
                  
                    .notion-row {
                      align-items: center;
                    }
                  
                    hr {
                      margin: 1rem 0;
                    }
                  
                    .notion-asset-wrapper {
                      margin: 0;
                    }
                  
                    .notion-h1 {
                      font-size: 2.5em;
                      line-height: 1.2em;
                      margin-bottom: 0;
                    }
                  `}
                  />
              )}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
/** Inlined version of noflash.js from use-dark-mode */
;(function () {
  var storageKey = 'darkMode'
  var classNameDark = 'dark-mode'
  var classNameLight = 'light-mode'
  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight)
    document.body.classList.remove(darkMode ? classNameLight : classNameDark)
  }
  var preferDarkQuery = '(prefers-color-scheme: dark)'
  var mql = window.matchMedia(preferDarkQuery)
  var supportsColorSchemeQuery = mql.media === preferDarkQuery
  var localStorageTheme = null
  try {
    localStorageTheme = localStorage.getItem(storageKey)
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme)
  }
  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme)
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches)
    localStorage.setItem(storageKey, mql.matches)
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark)
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode))
  }
})();
`
                }}
              />
              <Main />

              <NextScript />

            </ThemeProvider>
          </Root>
        </Html>
      </IconContext.Provider>
    )
  }
}
