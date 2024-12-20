"use client";
import * as React from "react";
import { useState } from "react";
import { Form as TicketComponentForm } from "@nextep/core/v1/models/workflow/TicketComponent";
import Section from "./section";

function Form(props: any) {
  const [page, setPage] = useState(() => 0);

  function createSections(ticketComponentForm: TicketComponentForm) {
    return ticketComponentForm
      .getValue()
      .getValue() /*.filter((_, index) => {
                                               const from = page * state.elementsPerPage;
                                               const to = from + state.elementsPerPage;
                                               return index >= from && index < to;
                                               })*/
      .map((element, index) => {
        return (
          <Section
            key={`section-${element.getId()}-${index}`}
            language={props.language}
            component={element}
          ></Section>
        );
      });
  }

  function createPages(ticketComponentForm: TicketComponentForm) {
    /*
return ticketComponentForm.getValue().getValue().filter((_, idx) => {
  return (idx < Math.ceil(ticketComponentForm.getValue().getValue().length / state.elementsPerPage))
}).map((_, idx) => {
  return (
  <div className="join">
  <button key={`btn-page-${idx}`} onClick={() => { setPage(idx) }} className={idx == page ? "btn-active join-item btn" : "join-item btn"}>{idx + 1}</button>
  </div>)
});
*/
    return <></>;
  }

  function createForm(ticketComponentForm: TicketComponentForm) {
    console.log(ticketComponentForm);
    return (
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={`grid grid-cols-2 gap-4`}>
          {createSections(ticketComponentForm)}
        </div>
        {createPages(ticketComponentForm)}
      </form>
    );
  }

  const [elementsPerPage, setElementsPerPage] = useState(() => null);

  return (
    <div className="container mx-auto">
      {createForm(props.component as TicketComponentForm)}
    </div>
  );
}

export default Form;
