import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { usePlugin } from 'tinacms'
import { CMS_NAME } from '../lib/constants'
import { useGithubJsonForm } from 'react-tinacms-github'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

export default function Index({ file, allPosts }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'subtitle', component: 'text' },
    ]
  }
  const [ data, form ] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro content={ data } />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  if (preview) {
    const content = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: '_content/home.json',
      data: (await import('../_content/home.json')).default,
    })

    console.log({ content })

    return {
      props: {
        ...content.props,
        allPosts,
      }
    }
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: '_content/home.json',
        data: (await import('../_content/home.json')).default,
      },
      allPosts
    },
  }
}
