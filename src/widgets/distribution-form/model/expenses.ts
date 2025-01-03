import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { nanoid } from 'nanoid';
import { readonly } from 'patronum';

import { RA, pipe } from '~/shared/lib/fp-ts';

import { Expense, ValidatedExpenseDraft } from '../lib';

export const createExpensesModel = () => {
    const push = createEvent<ValidatedExpenseDraft>();
    const remove = createEvent<Expense['id']>();

    const $expenses = createStore<readonly Expense[]>([]);

    sample({
        clock: push,
        source: $expenses,
        fn: (expenses, draft) => pipe(expenses, RA.concat([{ ...draft, id: nanoid() }])),
        target: $expenses,
    });

    sample({
        clock: remove,
        source: $expenses,
        fn: (expenses, id) =>
            pipe(
                expenses,
                RA.filter((expense) => expense.id !== id),
            ),
        target: $expenses,
    });

    persist({ store: $expenses, key: 'expenses' });

    return {
        push,
        remove,
        $expenses: readonly($expenses),
    };
};
