import React from 'react';

import {
    IsAnswers,
    LoadingElem,
    NotFound,
    options,
    options2,
    Pagination,
    ProfileNav,
    Question,
    Search,
    Selects,
} from '@/components';
import {Api} from '@/utils/api';
import {TQuestion} from '@/utils/api/models/question/types';

import ss from './ProfileWorks.module.scss';

interface ProfileWorksProps {
    isAuthor: boolean;
    userId: number;
}

export const ProfileWorks: React.FC<ProfileWorksProps> = ({
                                                              isAuthor,
                                                              userId,
                                                          }) => {
    const [questions, setQuestions] = React.useState<TQuestion[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const limit = 4;
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');
    const [searchValue2, setSearchValue2] = React.useState('');
    const [option, setOption] = React.useState(options[0]);
    const [option2, setOption2] = React.useState(options2[0]);
    const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
    const [activeLabel, setActiveLabel] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const params = {
                    limit,
                    page,
                    search: searchValue2,
                    ...(option && {orderBy: option.value}),
                    ...(userId && {userId}),
                    ...(activeFilter && {isAnswer: activeFilter}),
                    ...(activeLabel === 1 && {favorites: true}),
                };
                const {items, total} = await Api().question.getAll(params);
                setQuestions(items);
                setTotal(total);
                setIsLoading(false);
            } catch (err) {
                console.warn(err);
                alert('Ошибка при получении вопросов');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [searchValue2, page, option, activeFilter, activeLabel]);

    return (
        <div className={ss.works}>
            <ProfileNav
                isAuthor={isAuthor}
                active={activeLabel}
                setActive={setActiveLabel}
            />

            <div className={`block ${ss.questions}`}>
                <div className={ss.sort}>
                    <Search
                        value={searchValue}
                        setValue={setSearchValue}
                        setSearchValue={setSearchValue2}
                    />

                    <div className={ss.filters}>
                        <Selects
                            option={option}
                            setOption={setOption}
                            option2={option2}
                            setOption2={setOption2}
                        />

                        <IsAnswers
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        />
                    </div>
                </div>

                <div className={ss.items}>
                    {isLoading ? (
                        Array(limit)
                            .fill(0)
                            .map((_, index) => <LoadingElem key={index}/>)
                    ) : questions.length > 0 ? (
                        questions.map((obj) => (
                            <Question className={ss.question} key={obj.id} {...obj} />
                        ))
                    ) : (
                        <NotFound label="Здесь пока ничего нет :("/>
                    )}
                </div>

                {questions.length > 0 &&
                    <Pagination limit={limit} page={page} setPage={setPage} total={total}/>
                }
            </div>
        </div>
    );
};
