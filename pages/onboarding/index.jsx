import Layout from "../../src/components/layout/Layout"
import Onboarding from "../../src/components/onboarding/Onboarding"

const OnboardingPage = () => {
    const image = ''
    const descripcion = ''
    const title = 'Te presentamos Pikplay Latam'
    const url = ''
    return <Layout
        // mobileMenuHidden={true}
        image={image}
        descripcion={descripcion}
        title={title}
        url={url}>
        <Onboarding />
    </Layout>
}

export default OnboardingPage
