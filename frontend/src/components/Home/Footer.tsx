import { createStyles, Container, Group, Anchor, Text } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import semibot from "../../assets/semibot.png";
const useStyles = createStyles((theme) => ({
  footer: {

    borderTop: `2px solid var( --hover-second-color)`,
    background:'var(--second-theme-color)'
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function Footer() {
    const links = [
        {
          "link": "#",
          "label": "Privacy policy"
        },
        {
          "link": "#",
          "label": "Contact us"
        },
       
      ]
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
      <Text color="dimmed" size="sm">
          © {new Date().getFullYear()} Semibot. All rights reserved.
        </Text>

        
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}