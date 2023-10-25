import { Breadcrumbs, PageIcon, cs, useNotionContext } from "react-notion-x";
import { logo } from '@/lib/config';
import styled from '@emotion/styled'
import { getPageBreadcrumbs } from "notion-utils";
import React from "react";


export const LogoBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  img {
    height: 32px;
  }
`;

export const CustomBreadcrumbs = ({ block, rootOnly }) => {

    const { recordMap, mapPageUrl, components } = useNotionContext()
    let breadcrumbs = getPageBreadcrumbs(recordMap, block.id)
    if (rootOnly) {
        breadcrumbs = [breadcrumbs[0]].filter(Boolean)
    }
    if (logo) {
        block = {
            ...block,
            format: {
                ...block.format,
                page_icon: ''
            }
        }
    }

    // return <p>dsfdsfds<Breadcrumbs block={block} rootOnly={true} {...props}/></p>
    return (
        logo ? <>
            <div className='breadcrumbs' key='breadcrumbs'>
                {breadcrumbs.map((breadcrumb, index: number) => {
                    if (!breadcrumb) {
                        return null
                    }

                    const pageLinkProps: any = {}
                    const componentMap = {
                        pageLink: components.PageLink
                    }

                    if (breadcrumb.active) {
                        componentMap.pageLink = (props) => <div {...props} />
                    } else {
                        pageLinkProps.href = mapPageUrl(breadcrumb.pageId)
                    }

                    return (
                        <React.Fragment key={breadcrumb.pageId}>
                            <componentMap.pageLink
                                className={cs('breadcrumb', breadcrumb.active && 'active')}
                                {...pageLinkProps}
                            >
                                {breadcrumb.icon && (
                                    <LogoBox>
                                        <img
                                        src={logo}
                                        alt={breadcrumb.title || 'page icon'}
                                        className={'notion-page-icon'}
                                        />
                                    </LogoBox>
                                )}

                                {breadcrumb.title && (
                                    <span className='title'>{breadcrumb.title}</span>
                                )}
                            </componentMap.pageLink>

                            {index < breadcrumbs.length - 1 && (
                                <span className='spacer'>/</span>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </> :
            <Breadcrumbs block={{ ...block }} rootOnly={rootOnly} />
    )
}

export default CustomBreadcrumbs;