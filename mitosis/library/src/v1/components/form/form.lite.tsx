import {
    Form as TicketComponentForm
} from "@nextep/core/v1/models/workflow/TicketComponent";

import Section from "./section.lite";
import { useStore ,useState} from "@builder.io/mitosis";

export default function Form(props) {
    const [page, setPage] = useState(0);

    const state = useStore({
        elementsPerPage: 4,
        createSections: (ticketComponentForm: TicketComponentForm) => {
            return (ticketComponentForm).getValue()
                .getValue().filter((_, index) => {
                    const from = page * state.elementsPerPage;
                    const to = from + state.elementsPerPage;
                    return index >= from && index < to;
                }).map((element, index) => {
                    return (
                        <Section
                            key={`section-${element.getId()}-${index}`}
                            language={props.language}
                            component={element}
                        >
                        </Section>
                    );
                })
        },
        createPages: (ticketComponentForm: TicketComponentForm) => {
            return ticketComponentForm.getValue().getValue().filter((_, idx) => {
                return (idx < Math.ceil(ticketComponentForm.getValue().getValue().length / state.elementsPerPage))
            }).map((_, idx) => {
                return (<button key={`btn-page-${idx}`} onClick={() => { setPage(idx) }} className={idx == page ? "btn-active join-item btn" : "join-item btn"}>{idx + 1}</button>)
            });
        },
        createForm: (ticketComponentForm: TicketComponentForm) => {
            console.log(ticketComponentForm);
            return (
                <form action="#"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                    <div className={`grid grid-cols-2 gap-4`}>
                        {state.createSections(ticketComponentForm)}
                    </div>
                    <div className="join">
                        {state.createPages(ticketComponentForm)}
                    </div>
                </form>)
        }
    })

    return (
        <div class="container mx-auto">
            {state.createForm(props.component as TicketComponentForm)}
        </div>
    );
}
