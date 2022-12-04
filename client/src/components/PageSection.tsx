import {
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
} from '@mantine/core';
import {usePageSectionsStyles} from "../hooks/style/page-section";
import {IPost} from "../models/posts/IPost";
import {getText} from "../utils/get-text";
import {getShortText} from "../utils/get-short-text";
import {Link} from "react-router-dom";
import React from "react";

interface pageSectionProps {
    post: IPost,
    index: number
}

export function PageSection({ post, index }: pageSectionProps) {
    const { classes } = usePageSectionsStyles();

    return (
        <div className={`${classes.inner} ${classes.post}`}>
            <div className={classes.content}>
                <Title className={classes.title}>
                    {post.title}
                </Title>
                <Text color="dimmed" mt="md">
                    {getText(getShortText(post.desc))}
                </Text>

                <Group mt={30}>
                    <Link className="link" to={`/posts/${post.id}`}>
                        <Button variant="outline" size="md" className={classes.control}>
                            Read more
                        </Button>
                    </Link>
                </Group>
            </div>
            <div className="img">
                {
                    post.img && <Image src={`${process.env.REACT_APP_BACKEND_URL}/${post.img}`} className={classes.image} alt="Post preview" />
                }
            </div>
        </div>
    );
}

export default PageSection;