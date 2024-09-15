'use client';

import { ColumnDef } from '@tanstack/react-table';
import parseHTML from 'html-react-parser';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@components/action/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/card/HoverCard';
import { Badge } from '@components/util/Badge';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/list/DropdownMenu';
import { AspectRatio } from '@/components/media/AspectRatio';

// ================================================================

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Repository = {
  __typename: string;
  id: string;
  name: string;
  description: string;
  descriptionHTML: string;
  url: string;
  homepageUrl: string;
  openGraphImageUrl: string;
  owner: {
    __typename: string;
    id: string;
    login: string;
    url: string;
    avatarUrl: string;
  };
  stargazerCount: number;
  primaryLanguage?: {
    __typename: string;
    id: string;
    name: string;
    color: string;
  };
  isArchived: boolean;
  isBlankIssuesEnabled: boolean;
  isDisabled: boolean;
  isEmpty: boolean;
  isFork: boolean;
  isInOrganization: boolean;
  isPrivate: boolean;
  isTemplate: boolean;
};

const inverted = (color: string) => ({
  color,
  WebkitFilter: 'invert(100%)',
  filter: 'invert(100%)',
});

const getRepoState = (data: Repository) => {
  const { isInOrganization, isFork, isTemplate, isArchived, isDisabled, isEmpty } = data;
  const state = isInOrganization
    ? 'organization'
    : isFork
      ? 'fork'
      : isTemplate
        ? 'template'
        : isArchived
          ? 'archived'
          : isDisabled
            ? 'disabled'
            : isEmpty
              ? 'empty'
              : 'active';
  switch (state) {
    case 'organization':
      return { label: 'Organization', color: 'warning', labelColor: 'text-warning-content' };
    case 'fork':
      return { label: 'Fork', color: 'info', labelColor: 'text-info-content' };
    case 'template':
      return { label: 'Template', color: 'success', labelColor: 'text-success-content' };
    case 'archived':
      return { label: 'Archived', color: 'accent', labelColor: 'text-accent-content' };
    case 'disabled':
      return { label: 'Disabled', color: 'error', labelColor: 'text-error-content' };
    case 'empty':
      return { label: 'Empty', color: 'secondary', labelColor: 'text-secondary-content' };
    default:
      return { label: 'Active', color: 'primary', labelColor: 'text-primary-content' };
  }
};

export const DataColumns: ColumnDef<Repository>[] = [
  {
    header: 'Public',
    cell: ({ row }) => {
      const isPrivate = row.original.isPrivate;
      const props = isPrivate
        ? {
            label: 'Private',
            color: 'error',
          }
        : {
            label: 'Public',
            color: 'success',
          };
      return <Badge {...props} />;
    },
  },
  {
    header: 'Repo Status',
    cell: ({ row }) => {
      const data = row.original;
      const { label, color, labelColor } = getRepoState(data);
      return (
        <Badge color={color} variant='outline'>
          <label>{label}</label>
        </Badge>
      );
    },
  },
  {
    header: 'Name',
    cell: ({ row }) => {
      const data = row.original;
      const url = data.url;
      const name = data.name;
      return <a href={url}>{name}</a>;
    },
  },
  {
    // accessorKey: 'descriptionHTML',
    header: 'Description',
    cell: ({ row }) => {
      const data = row.original;
      // return parseHTML(data.descriptionHTML);
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className='description'>{parseHTML(data.descriptionHTML)}</div>
          </HoverCardTrigger>
          <HoverCardContent>
            <AspectRatio ratio={16 / 9} className='bg-muted'>
              <Image src={data.openGraphImageUrl} alt='Repository URL registered on OpenGraph' fill className='h-full w-full rounded-md object-cover' />
            </AspectRatio>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    header: 'Owner',
    cell: ({ row }) => {
      const owner = row.original.owner;
      return owner && <a href={owner.url}>{owner.login}</a>;
    },
  },
  {
    accessorKey: 'stargazerCount',
    header: 'Stars',
  },
  {
    accessorKey: 'primaryLanguage.name',
    header: 'Primary Language',
    cell: ({ row }) => {
      const language = row.original.primaryLanguage;
      return (
        language && (
          <Badge style={{ backgroundColor: language.color }}>
            <label style={{ ...inverted(language.color), whiteSpace: 'nowrap' }}>{language.name}</label>
          </Badge>
        )
      );
    },
  },
  {
    accessorKey: 'homepageUrl',
    header: 'Homepage',
    cell: ({ row }) => {
      const homepageUrl = row.original.homepageUrl;
      return (
        homepageUrl && (
          <div className='f-center'>
            <a className='flex' href={homepageUrl}>
              <ExternalLink className='h-5 w-5' />
            </a>
          </div>
        )
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const repository = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(repository.url)}>Copy repository URL</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View repo owner</DropdownMenuItem>
            <DropdownMenuItem>View repo details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
