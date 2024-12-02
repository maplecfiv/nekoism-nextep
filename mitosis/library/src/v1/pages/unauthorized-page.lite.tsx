export default function UnauthorizedPage(props) {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">#page.unauthorized.title</h1>
                        <p className="py-6">
                            #page.unauthorized.content
                        </p>
                        <button className="btn btn-primary">#page.unauthorized.btnBack.label</button>
                    </div>
                </div>
            </div>
        </>
    )
}
